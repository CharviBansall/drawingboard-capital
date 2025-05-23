import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { Accordion } from 'radix-ui';
import '../styles/accordion.css';
import { Paperclip, Calendar, CheckCircle } from 'lucide-react';
import Button from '@/components/Button';
import { format, isPast, isToday } from 'date-fns';
import { useProfile } from '@/hooks/useProfile';
import PageTitle from '@/components/PageTitle';

export default function Compliance() {
  // State for user profile and company compliance tasks
  const { profile } = useProfile();
  const [complianceTasks, setComplianceTasks] = useState<any[]>([]);
  const [pastDueTasks, setPastDueTasks] = useState<any[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'upcoming' | 'all' | 'completed'>(
    'upcoming',
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    return format(date, 'MMM d, yyyy');
  };

  // Function to mark a task as complete
  const markTaskComplete = async (complianceId: string) => {
    try {
      // Update the company_compliance record
      const { error } = await supabase
        .from('company_compliance')
        .update({
          last_completed_date: new Date().toISOString(),
        })
        .eq('id', complianceId);

      if (error) throw error;

      // Refresh the tasks
      fetchComplianceTasks();
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };

  // Function to fetch compliance tasks
  const fetchComplianceTasks = async () => {
    if (!profile?.company_id) return;

    try {
      // Get all company compliance items with their definitions and dates
      const { data, error } = await supabase
        .from('company_compliance')
        .select(
          `
      *,
          compliance_definitions:compliance_definition_id(id, name, detail),
          company_compliance_dates(id, date)
        `,
        )
        .eq('company_id', profile.company_id);

      if (error) {
        console.log('Compliance ERROR', error);
        return;
      }
      if (data) console.log(data);
      // Transform the data to a more usable format
      const transformedTasks = data.flatMap((item: any) => {
        // Skip items without dates
        if (
          !item.company_compliance_dates ||
          item.company_compliance_dates.length === 0
        ) {
          return [];
        }

        // Create a task for each date
        return item.company_compliance_dates.map((dateItem: any) => ({
          id: dateItem.id,
          company_compliance_id: item.id,
          name: item.compliance_definitions?.name || 'Unknown Task',
          detail: item.compliance_definitions?.detail || '',
          due_date: dateItem.date,
          last_completed_date: item.last_completed_date,
          status: item.status,
          assigned_to: item.assigned_to,
          period_type: item.period_type,
        }));
      });

      // Sort by due date
      transformedTasks.sort((a: any, b: any) => {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      });

      // Filter tasks into categories
      const today = new Date();
      const pastDue = transformedTasks.filter((task: any) => {
        const dueDate = new Date(task.due_date);
        return (
          !task.last_completed_date && isPast(dueDate) && !isToday(dueDate)
        );
      });

      const upcoming = transformedTasks.filter((task: any) => {
        const dueDate = new Date(task.due_date);
        return (
          !task.last_completed_date && (isToday(dueDate) || dueDate > today)
        );
      });

      const completed = transformedTasks
        .filter((task: any) => {
          return !!task.last_completed_date;
        })
        .slice(0, 20); // Show only last 20 completed tasks

      setComplianceTasks(transformedTasks);
      setPastDueTasks(pastDue);
      setUpcomingTasks(upcoming);
      setCompletedTasks(completed);
    } catch (error) {
      console.error('Error fetching compliance tasks:', error);
    }
  };

  // Load user profile and compliance tasks on component mount
  useEffect(() => {
    async function loadData() {
      try {
        if (profile?.company_id) {
          await fetchComplianceTasks();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [profile?.company_id]);

  // Effect to refresh tasks when view mode changes
  useEffect(() => {
    if (profile?.company_id) {
      fetchComplianceTasks();
    }
  }, [viewMode, profile?.company_id]);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Compliance Tasks" />
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'upcoming' ? 'secondary' : 'ghost'}
            onClick={() => setViewMode('upcoming')}
            size="small"
          >
            Upcoming
          </Button>
          <Button
            variant={viewMode === 'all' ? 'secondary' : 'ghost'}
            onClick={() => setViewMode('all')}
            size="small"
          >
            All Tasks
          </Button>
          <Button
            variant={viewMode === 'completed' ? 'secondary' : 'ghost'}
            onClick={() => setViewMode('completed')}
            size="small"
          >
            Completed
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : !profile?.company_id ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-700">
            You need to be associated with a company to view compliance tasks.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Past Due Tasks Section */}
          {pastDueTasks.length > 0 &&
            (viewMode === 'upcoming' || viewMode === 'all') && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-red-600 flex items-center">
                  <span className="mr-2">Past Due</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {pastDueTasks.length}
                  </span>
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-4 text-xs font-medium text-gray-500 uppercase">
                      <div className="text-left">Activity</div>
                      <div className="text-center">Due Date</div>
                      <div className="text-center">Assigned To</div>
                      <div className="text-right">Actions</div>
                    </div>
                  </div>

                  <Accordion.Root
                    type="multiple"
                    className="bg-white divide-y divide-gray-200"
                  >
                    {pastDueTasks.map((task) => (
                      <Accordion.Item
                        key={task.id}
                        value={`task-${task.id}`}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <Accordion.Header className="w-full">
                          <Accordion.Trigger className="w-full text-sm px-6 py-4 grid grid-cols-4 items-center justify-between hover:bg-gray-50 focus:outline-none">
                            <span className="text-left font-medium text-red-600">
                              {task.period_type} {task.name}
                            </span>
                            <span className="text-center text-red-600">
                              {formatDate(task.due_date)}
                            </span>
                            <span className="text-center">
                              {task.assigned_to || 'Any Supervisor'}
                            </span>
                            <div className="text-right flex justify-end space-x-2">
                              <Button
                                variant="primary"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markTaskComplete(task.company_compliance_id);
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Complete
                              </Button>
                            </div>
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="px-6 py-4 bg-gray-50 accordion-content overflow-hidden">
                          <div className="text-sm text-gray-700 mb-4">
                            {task.detail}
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              variant="secondary"
                              size="small"
                              className="mr-2"
                            >
                              <Paperclip className="w-4 h-4 mr-1" />
                              Attach Evidence
                            </Button>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </div>
              </div>
            )}

          {/* Upcoming Tasks Section */}
          {upcomingTasks.length > 0 &&
            (viewMode === 'upcoming' || viewMode === 'all') && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-blue-600 flex items-center">
                  <span className="mr-2">Upcoming</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {upcomingTasks.length}
                  </span>
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-4 text-xs font-medium text-gray-500 uppercase">
                      <div className="text-left">Activity</div>
                      <div className="text-center">Due Date</div>
                      <div className="text-center">Assigned To</div>
                      <div className="text-right">Actions</div>
                    </div>
                  </div>

                  <Accordion.Root
                    type="multiple"
                    className="bg-white divide-y divide-gray-200"
                  >
                    {upcomingTasks.map((task) => (
                      <Accordion.Item
                        key={task.id}
                        value={`task-${task.id}`}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <Accordion.Header className="w-full">
                          <Accordion.Trigger className="w-full text-sm px-6 py-4 grid grid-cols-4 items-center justify-between hover:bg-gray-50 focus:outline-none">
                            <span className="text-left font-medium">
                              {task.name}
                            </span>
                            <span className="text-center">
                              {formatDate(task.due_date)}
                            </span>
                            <span className="text-center">
                              {task.assigned_to || 'Any Supervisor'}
                            </span>
                            <div className="text-right flex justify-end space-x-2">
                              <Button
                                variant="primary"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markTaskComplete(task.company_compliance_id);
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Complete
                              </Button>
                            </div>
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="px-6 py-4 bg-gray-50 accordion-content overflow-hidden">
                          <div className="text-sm text-gray-700 mb-4">
                            {task.detail}
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              variant="secondary"
                              size="small"
                              className="mr-2"
                            >
                              <Paperclip className="w-4 h-4 mr-1" />
                              Attach Evidence
                            </Button>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </div>
              </div>
            )}

          {/* Completed Tasks Section */}
          {completedTasks.length > 0 &&
            (viewMode === 'completed' || viewMode === 'all') && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-green-600 flex items-center">
                  <span className="mr-2">Completed</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {completedTasks.length}
                  </span>
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-4 text-xs font-medium text-gray-500 uppercase">
                      <div className="text-left">Activity</div>
                      <div className="text-center">Due Date</div>
                      <div className="text-center">Completed On</div>
                      <div className="text-right">Assigned To</div>
                    </div>
                  </div>

                  <Accordion.Root
                    type="multiple"
                    className="bg-white divide-y divide-gray-200"
                  >
                    {completedTasks.map((task) => (
                      <Accordion.Item
                        key={task.id}
                        value={`task-${task.id}`}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <Accordion.Header className="w-full">
                          <Accordion.Trigger className="w-full text-sm px-6 py-4 grid grid-cols-4 items-center justify-between hover:bg-gray-50 focus:outline-none">
                            <span className="text-left font-medium text-gray-500">
                              {task.name}
                            </span>
                            <span className="text-center text-gray-500">
                              {formatDate(task.due_date)}
                            </span>
                            <span className="text-center text-green-600">
                              {formatDate(task.last_completed_date || '')}
                            </span>
                            <span className="text-right text-gray-500">
                              {task.assigned_to || 'Any Supervisor'}
                            </span>
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="px-6 py-4 bg-gray-50 accordion-content overflow-hidden">
                          <div className="text-sm text-gray-700 mb-4">
                            {task.detail}
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button variant="secondary" size="small">
                              <Paperclip className="w-4 h-4 mr-1" />
                              View Evidence
                            </Button>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </div>
              </div>
            )}

          {/* No Tasks Message */}
          {complianceTasks.length === 0 && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No compliance tasks found
              </h3>
              <p className="text-gray-500">
                Your company doesn't have any compliance tasks scheduled yet.
              </p>
            </div>
          )}

          {/* Calendar View Button */}
          <div className="mt-6 flex justify-end">
            <Button variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
