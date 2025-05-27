import { Accordion } from 'radix-ui';
import TaskItem from './TaskItem';
import { Calendar } from '@phosphor-icons/react';

interface TaskListProps {
  title: string;
  tasks: any[];
  formatDate: (dateString: string) => string;
  isPastDue?: boolean;
  isCompleted?: boolean;
  onMarkComplete?: (complianceId: string, dateId: string) => void;
  onAttachEvidence?: (complianceId: string) => void;
  onViewEvidence?: (complianceId: string) => void;
}

function TaskList({
  title,
  tasks,
  formatDate,
  isPastDue = false,
  isCompleted = false,
  onMarkComplete,
  onAttachEvidence,
  onViewEvidence,
}: TaskListProps) {
  if (tasks.length === 0) return null;

  const titleColorClass = isPastDue
    ? 'text-red-600'
    : isCompleted
      ? 'text-green-600'
      : 'text-blue-12';

  const badgeColorClass = isPastDue
    ? 'bg-red-100 text-red-800'
    : isCompleted
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-5 text-blue-12';

  return (
    <div>
      <h2
        className={`text-lg font-semibold mb-3 ${titleColorClass} flex items-center`}
      >
        <span className="mr-2">{title}</span>
        <span className={`${badgeColorClass} text-xs px-2 py-1 rounded-full`}>
          {tasks.length}
        </span>
      </h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-4 text-xs font-medium text-gray-500 uppercase">
            <div className="text-left">Activity</div>
            <div className="text-center">Due Date</div>
            <div className="text-center">
              {isCompleted ? 'Completed On' : 'Assigned To'}
            </div>
            <div className="text-right">
              {isCompleted ? 'Assigned To' : 'Actions'}
            </div>
          </div>
        </div>

        <Accordion.Root
          type="multiple"
          className="bg-white divide-y divide-gray-200"
        >
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              formatDate={formatDate}
              isCompleted={isCompleted}
              isPastDue={isPastDue}
              onMarkComplete={onMarkComplete}
              onAttachEvidence={onAttachEvidence}
              onViewEvidence={onViewEvidence}
            />
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
}

export function EmptyTaskList() {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <Calendar />
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No compliance tasks found
      </h3>
      <p className="text-gray-500">
        Your company doesn't have any compliance tasks scheduled yet.
      </p>
    </div>
  );
}

export default TaskList;
