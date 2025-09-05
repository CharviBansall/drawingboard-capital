import { useState } from 'react';
import { Accordion } from 'radix-ui';
import Button from '@/components/Button';
import {
  Check,
  Paperclip,
  CircleNotch,
  FileArrowDown,
} from '@phosphor-icons/react';
import { format } from 'date-fns';

interface ComplianceDocument {
  id: string;
  document_name: string;
  document_url: string;
  notes: string | null;
  uploaded_at: string;
  uploaded_by: string;
}

interface TaskWithDocuments {
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

interface TaskItemProps {
  task: TaskWithDocuments;
  formatDate: (dateString: string) => string;
  isCompleted?: boolean;
  isPastDue?: boolean;
  onMarkComplete?: (complianceId: string, dateId: string) => void;
  onAttachEvidence?: (complianceId: string) => void;
  onViewEvidence?: (complianceId: string) => void;
}

function TaskItem({
  task,
  formatDate,
  isCompleted = false,
  isPastDue = false,
  onMarkComplete,
  onAttachEvidence,
  onViewEvidence,
}: TaskItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  return (
    <Accordion.Item
      key={task.id}
      value={`task-${task.id}`}
      className="border-b border-gray-200 last:border-b-0"
    >
      <Accordion.Header className="w-full">
        <Accordion.Trigger className="w-full text-sm px-6 py-4 grid grid-cols-4 items-center justify-between hover:bg-gray-50 focus:outline-none">
          <span
            className={`text-left font-medium ${isPastDue ? 'text-red-600' : isCompleted ? 'text-gray-500' : ''}`}
          >
            {task.period_type && `${task.period_type} `}
            {task.name}
          </span>
          <span className={`text-center ${isPastDue ? 'text-red-600' : ''}`}>
            {formatDate(task.due_date)}
          </span>
          {isCompleted ? (
            <span className="text-center text-green-600">
              {formatDate(task.due_date || '')}
            </span>
          ) : (
            <span className="text-center">
              {task.assigned_to || 'Any Supervisor'}
            </span>
          )}
          {!isCompleted ? (
            <div className="text-right flex justify-end space-x-2">
              {onMarkComplete && (
                <Button
                  as="div"
                  variant="primary"
                  size="small"
                  disabled={isCompleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCompleting(true);
                    onMarkComplete(task.id, task.id);
                    // Reset completing state after a delay
                    setTimeout(() => {
                      setIsCompleting(false);
                    }, 1000);
                  }}
                >
                  {isCompleting ? (
                    <>
                      <CircleNotch className="w-4 h-4 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Mark as Complete
                    </>
                  )}
                </Button>
              )}
            </div>
          ) : (
            <span className="text-right text-gray-500">
              {task.assigned_to || 'Any Supervisor'}
            </span>
          )}
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="px-6 py-4 bg-gray-50 accordion-content overflow-hidden">
        <div className="text-sm text-gray-700 mb-4">{task.detail}</div>

        {/* Display attached documents if any */}
        {task.documents && task.documents.length > 0 && (
          <div className="mt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Attached Documents
            </h4>
            <div className="space-y-2">
              {task.documents.map((doc: ComplianceDocument) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                >
                  <div className="flex items-center">
                    <FileArrowDown className="text-blue-500 w-4 h-4 mr-2" />
                    <div>
                      <div className="text-sm font-medium">
                        {doc.document_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(
                          new Date(doc.uploaded_at),
                          'MMM d, yyyy h:mm a',
                        )}
                      </div>
                      {doc.notes && (
                        <div className="text-xs italic mt-1">{doc.notes}</div>
                      )}
                    </div>
                  </div>
                  <Button
                    as="a"
                    href={doc.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="small"
                  >
                    <FileArrowDown className="w-3 h-3" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          {isCompleted && onViewEvidence ? (
            <Button
              variant="secondary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onViewEvidence(task.id);
              }}
            >
              <Paperclip className="w-4 h-4 mr-1" />
              View Evidence
            </Button>
          ) : (
            onAttachEvidence && (
              <Button
                variant="secondary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onAttachEvidence(task.id);
                }}
              >
                <Paperclip className="w-4 h-4 mr-1" />
                Attach Evidence
              </Button>
            )
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default TaskItem;
