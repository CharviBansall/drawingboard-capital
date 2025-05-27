import Button from '@/components/Button';
import { Paperclip, X } from '@phosphor-icons/react';
import { AlertDialog } from 'radix-ui';

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  fileName: string | null;
  fileUrl: string | null;
  notes: string;
  taskId: string | null;
}

interface UploadModalProps {
  uploadState: UploadState;
  onCancel: () => void;
  onSave: () => void;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileSelect: () => void;
}

function UploadModal({
  uploadState,
  onCancel,
  onSave,
  onNotesChange,
  onFileSelect,
}: UploadModalProps) {
  return (
    <AlertDialog.Root open={!!uploadState.taskId} onOpenChange={() => onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-opacity-50 z-50" />
        <AlertDialog.Content className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white opacity-100 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog.Title className="text-lg font-medium">Upload Evidence Document</AlertDialog.Title>
              <AlertDialog.Cancel asChild>
                <button className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </AlertDialog.Cancel>
            </div>
            
            <AlertDialog.Description className="text-sm text-gray-600 mb-4">
              Upload a document as evidence for this compliance task. Supported file types include PDF, Word, and image files.
            </AlertDialog.Description>

        {uploadState?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {uploadState.error}
          </div>
        )}

        {uploadState?.isUploading ? (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              Uploading {uploadState.fileName}...
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadState.progress}%` }}
              ></div>
            </div>
          </div>
        ) : uploadState?.fileName ? (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded flex items-center">
            <Paperclip className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700 truncate">
              {uploadState.fileName}
            </span>
          </div>
        ) : (
          <div className="mb-4">
            <div 
              onClick={onFileSelect}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              <Paperclip className="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload a file</p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, Word, or Image files
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={uploadState?.notes || ''}
            onChange={onNotesChange}
            placeholder="Add any notes about this evidence..."
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          <AlertDialog.Cancel asChild>
            <Button variant="secondary">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button
              variant="primary"
              onClick={onSave}
              disabled={!uploadState?.fileUrl || uploadState?.isUploading}
            >
              Save Evidence
            </Button>
          </AlertDialog.Action>
        </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default UploadModal;
