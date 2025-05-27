import { useState, useCallback } from 'react';
import supabase from '@/lib/supabase';

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  fileName: string | null;
  fileUrl: string | null;
  notes: string;
  taskId: string | null;
}

const initialUploadState: UploadState = {
  isUploading: false,
  progress: 0,
  error: null,
  fileName: null,
  fileUrl: null,
  notes: '',
  taskId: null,
};

export function useDocumentUpload(
  companyId: string | undefined,
  userId: string | undefined,
  onSuccess: () => void,
) {
  const [uploadState, setUploadState] =
    useState<UploadState>(initialUploadState);

  // Function to get next document sequence number for a compliance task
  const getNextDocumentSequence = async (dateId: string): Promise<string> => {
    try {
      // Query existing documents for this compliance task
      const { data, error } = await supabase
        .from('compliance_documents')
        .select('document_name')
        .eq('company_compliance_date_id', dateId);

      if (error) throw error;

      // Start with 001 if no documents exist
      if (!data || data.length === 0) {
        return '001';
      }

      // Find the highest sequence number
      let maxSequence = 0;
      data.forEach((doc) => {
        // Extract sequence number from document name if it follows our pattern
        const match = doc.document_name.match(/_(\d{3})\./i);
        if (match && match[1]) {
          const sequence = parseInt(match[1], 10);
          if (sequence > maxSequence) {
            maxSequence = sequence;
          }
        }
      });

      // Increment and format with leading zeros
      const nextSequence = maxSequence + 1;
      return nextSequence.toString().padStart(3, '0');
    } catch (error) {
      console.error('Error getting next document sequence:', error);
      return '001'; // Default to 001 if there's an error
    }
  };

  // Function to handle file selection for evidence upload
  const handleFileSelect = useCallback((taskId: string) => {
    setUploadState((prev) => ({ ...prev, taskId }));
  }, []);

  // Function to handle file change event
  const handleFileChange = useCallback(
    async (file: File) => {
      if (!file || !uploadState.taskId || !companyId) return;

      setUploadState((prev) => ({
        ...prev,
        isUploading: true,
        fileName: file.name,
        progress: 0,
        error: null,
      }));

      try {
        // Get the next sequence number for this compliance task
        const sequenceNumber = await getNextDocumentSequence(
          uploadState.taskId,
        );

        // Create a filename with the compliance ID and sequence number
        const fileExt = file.name.split('.').pop();
        const originalFileName = file.name.split('.')[0];
        const fileName = `${uploadState.taskId}_${sequenceNumber}.${fileExt}`;
        const displayName = `${originalFileName}_${sequenceNumber}.${fileExt}`;
        const filePath = `${companyId}/${fileName}`;

        // Upload file to storage
        const { error } = await supabase.storage
          .from('compliance-documents')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        // Get public URL for the uploaded file
        const {
          data: { publicUrl },
        } = supabase.storage
          .from('compliance-documents')
          .getPublicUrl(filePath);

        setUploadState((prev) => ({
          ...prev,
          isUploading: false,
          progress: 100,
          fileUrl: publicUrl,
          fileName: displayName, // Use the display name with sequence number
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadState((prev) => ({
          ...prev,
          isUploading: false,
          error: 'Failed to upload file. Please try again.',
        }));
      }
    },
    [uploadState.taskId, companyId],
  );

  // Function to handle notes change
  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUploadState((prev) => ({ ...prev, notes: e.target.value }));
    },
    [],
  );

  // Function to save evidence document metadata to database
  const saveEvidenceDocument = useCallback(
    async (tasks: any[]) => {
      if (
        !uploadState.fileUrl ||
        !uploadState.taskId ||
        !uploadState.fileName ||
        !userId
      ) {
        setUploadState((prev) => ({
          ...prev,
          error: 'Missing file information. Please upload a file first.',
        }));
        return;
      }

      try {
        // Get the task information
        const task = tasks.find((t) => t.id === uploadState.taskId);

        if (!task) throw new Error('Task not found');

        const currentDate = new Date().toISOString();

        // Insert document record
        const { error: docError } = await supabase
          .from('compliance_documents')
          .insert({
            company_compliance_date_id: uploadState.taskId,
            document_name: uploadState.fileName,
            document_url: uploadState.fileUrl,
            notes: uploadState.notes,
            uploaded_by: userId,
            uploaded_at: currentDate,
          });

        if (docError) throw docError;

        // Add entry to compliance_history table for document upload
        const { error: historyError } = await supabase
          .from('compliance_history')
          .insert({
            company_compliance_date_id: uploadState.taskId,
            status: 'document_added',
            performed_by: userId,
            action_date: currentDate,
            notes: `Document uploaded: ${uploadState.fileName}${uploadState.notes ? ` - ${uploadState.notes}` : ''}`,
          });

        if (historyError) {
          console.error(
            'Error adding history record for document upload:',
            historyError,
          );
          // Continue even if history record fails - don't throw
        }

        // Reset upload state
        setUploadState(initialUploadState);

        // Call success callback
        onSuccess();
      } catch (error) {
        console.error('Error saving document metadata:', error);
        setUploadState((prev) => ({
          ...prev,
          error: 'Failed to save document information. Please try again.',
        }));
      }
    },
    [uploadState, userId, onSuccess],
  );

  // Function to cancel the upload process
  const cancelUpload = useCallback(() => {
    setUploadState(initialUploadState);
  }, []);

  return {
    uploadState,
    handleFileSelect,
    handleFileChange,
    handleNotesChange,
    saveEvidenceDocument,
    cancelUpload,
  };
}
