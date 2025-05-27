import { format } from 'date-fns';
import { X, FileArrowDown, Paperclip, Check, CircleNotch } from '@phosphor-icons/react';
import Button from '@/components/Button';
import { useState } from 'react';
import { AlertDialog } from 'radix-ui';

interface ComplianceDocument {
  id: string;
  document_name: string;
  document_url: string;
  notes: string | null;
  uploaded_at: string;
  uploaded_by: string;
}

interface ComplianceTask {
  id: string;
  company_compliance_id: string;
  name: string;
  detail: string;
  due_date: string;
  status: 'pending' | 'submitted';
  assigned_to: string | null;
  period_type: string;
  documents?: ComplianceDocument[];
}

interface TaskDetailModalProps {
  task: ComplianceTask;
  onClose: () => void;
  onMarkComplete?: (complianceId: string, dateId: string) => void;
  onAttachEvidence?: (complianceId: string) => void;
  onViewEvidence?: (complianceId: string) => void;
}

function TaskDetailModal({
  task,
  onClose,
  onMarkComplete,
  onAttachEvidence,
  onViewEvidence,
}: TaskDetailModalProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Add null checks to prevent errors when task is null
  const isCompleted = task?.status === 'submitted';
  const isPastDue = task ? new Date(task.due_date) < new Date() && !isCompleted : false;

  const handleMarkComplete = () => {
    if (onMarkComplete && task) {
      setIsCompleting(true);
      onMarkComplete(task.id, task.id);
      // Reset completing state after a delay
      setTimeout(() => {
        setIsCompleting(false);
      }, 1000);
    }
  };

  return (
    <AlertDialog.Root open={!!task} onOpenChange={() => onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <AlertDialog.Content className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <AlertDialog.Title className="text-lg font-semibold">
                {task && (
                  <span className={`${isPastDue ? 'text-red-600' : isCompleted ? 'text-green-600' : ''}`}>
                    {task.period_type && `${task.period_type} `}{task.name}
                  </span>
                )}
              </AlertDialog.Title>
              <AlertDialog.Cancel asChild>
                <button className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </AlertDialog.Cancel>
            </div>
            
            {task && (
              <AlertDialog.Description className="sr-only">
                Compliance task details for {task.name}. Due on {format(new Date(task.due_date), 'MMM d, yyyy')}. 
                Status: {isCompleted ? 'Completed' : isPastDue ? 'Past Due' : 'Pending'}.
              </AlertDialog.Description>
            )}
        
        <div className="p-4">
          {task && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className={`font-medium ${isPastDue ? 'text-red-600' : ''}`}>
                  {format(new Date(task.due_date), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${isCompleted ? 'text-green-600' : isPastDue ? 'text-red-600' : 'text-blue-600'}`}>
                  {isCompleted ? 'Completed' : isPastDue ? 'Past Due' : 'Pending'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned To</p>
                <p className="font-medium">{task.assigned_to || 'Any Supervisor'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Period Type</p>
                <p className="font-medium">{task.period_type || 'N/A'}</p>
              </div>
            </div>
          )}
          
          {task && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Details</p>
              <p className="text-sm text-gray-700">{task.detail}</p>
            </div>
          )}
          
          {/* Display attached documents if any */}
          {task?.documents && task.documents.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Documents</h4>
              <div className="space-y-2">
                {task.documents.map((doc: ComplianceDocument) => (
                  <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                    <div className="flex items-center">
                      <FileArrowDown className="text-blue-500 w-4 h-4 mr-2" />
                      <div>
                        <div className="text-sm font-medium">{doc.document_name}</div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(doc.uploaded_at), 'MMM d, yyyy h:mm a')}
                        </div>
                        {doc.notes && <div className="text-xs italic mt-1">{doc.notes}</div>}
                      </div>
                    </div>
                    <a 
                      href={doc.document_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      <Button variant="secondary" size="small">
                        <FileArrowDown className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {task && (
            <div className="flex justify-end space-x-2 mt-6">
              {isCompleted && onViewEvidence ? (
                <Button
                  variant="secondary"
                  onClick={() => onViewEvidence(task.id)}
                >
                  <Paperclip className="w-4 h-4 mr-1" />
                  View Evidence
                </Button>
              ) : (
                <>
                  {onAttachEvidence && (
                    <Button
                      variant="secondary"
                      onClick={() => onAttachEvidence(task.id)}
                    >
                      <Paperclip className="w-4 h-4 mr-1" />
                      Attach Evidence
                    </Button>
                  )}
                  {onMarkComplete && !isCompleted && (
                    <AlertDialog.Action asChild>
                      <Button
                        variant="primary"
                        onClick={handleMarkComplete}
                        disabled={isCompleting}
                      >
                        {isCompleting ? (
                          <>
                            <CircleNotch className="w-4 h-4 mr-1 animate-spin" />
                            Completing...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Mark as Complete
                          </>
                        )}
                      </Button>
                    </AlertDialog.Action>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
  );
}

export default TaskDetailModal;
