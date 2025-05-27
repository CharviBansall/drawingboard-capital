import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
  getDay,
} from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Button from '@/components/Button';

interface ComplianceTask {
  id: string;
  company_compliance_id: string;
  name: string;
  detail: string;
  due_date: string;
  status: 'pending' | 'submitted';
  assigned_to: string | null;
  period_type: string;
  documents?: any[];
}

interface CalendarViewProps {
  tasks: ComplianceTask[];
  onTaskClick: (task: ComplianceTask) => void;
}

function CalendarView({ tasks, onTaskClick }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  const startDay = getDay(monthStart);

  // Group tasks by date for easier lookup
  const tasksByDate: Record<string, ComplianceTask[]> = {};
  tasks.forEach((task) => {
    const dateKey = task.due_date.split('T')[0]; // Format YYYY-MM-DD
    if (!tasksByDate[dateKey]) {
      tasksByDate[dateKey] = [];
    }
    tasksByDate[dateKey].push(task);
  });

  // Create calendar grid with empty cells for days before the start of the month
  const calendarGrid = [];

  // Add empty cells for days before the start of the month
  for (let i = 0; i < startDay; i++) {
    calendarGrid.push(
      <div
        key={`empty-${i}`}
        className="h-32 border border-gray-200 p-2 w-full"
      ></div>,
    );
  }

  // Add cells for each day of the month
  monthDays.forEach((day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const dayTasks = tasksByDate[dateKey] || [];
    const isPastDue = dayTasks.some(
      (task) =>
        task.status === 'pending' &&
        new Date(task.due_date) < new Date() &&
        !isToday(new Date(task.due_date)),
    );
    const isCompleted = dayTasks.every((task) => task.status === 'submitted');
    const hasTask = dayTasks.length > 0;

    const cellClasses = `h-32 border border-gray-200 p-2 relative w-full ${isToday(day) ? 'bg-blue-50' : ''} ${hasTask ? 'cursor-pointer' : ''}`;

    calendarGrid.push(
      <div
        key={dateKey}
        className={cellClasses}
        onClick={() => dayTasks.length > 0 && onTaskClick(dayTasks[0])}
      >
        <div className="flex justify-between">
          <div
            className={`text-base font-medium ${isToday(day) ? 'bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''}`}
          >
            {format(day, 'd')}
          </div>
          {hasTask && (
            <div
              className={`w-3 h-3 rounded-full ${isPastDue ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
            ></div>
          )}
        </div>
        {dayTasks.length > 0 && (
          <div className="mt-2 absolute top-10 bottom-2 left-2 right-2 overflow-y-auto calendar-day-scrollbar">
            {dayTasks.map((task) => (
              <div
                key={task.id}
                className={`text-sm p-2 mb-1 rounded truncate ${
                  task.status === 'submitted'
                    ? 'bg-green-100 text-green-800'
                    : isPastDue
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {task.name}
              </div>
            ))}
          </div>
        )}
      </div>,
    );
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-none">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button variant="secondary" size="small" onClick={prevMonth}>
            <CaretLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button variant="secondary" size="small" onClick={nextMonth}>
            <CaretRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        className="grid grid-cols-7 gap-0 w-full"
        style={{ minWidth: '100%' }}
      >
        {/* Days of the week */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-gray-500 text-base py-3"
          >
            {day}
          </div>
        ))}

        {/* Calendar grid */}
        {calendarGrid}
      </div>

      <div className="mt-4 flex items-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>Upcoming</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>Past Due</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
