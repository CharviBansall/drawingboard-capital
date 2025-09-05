import { useState, useCallback, useEffect } from 'react';
import supabase from '@/lib/supabase';
import { format, isPast, isToday } from 'date-fns';

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

// Mock data for development
const createMockTasks = (): ComplianceTask[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const completed = new Date(today);
  completed.setDate(completed.getDate() - 3);

  return [
    {
      id: '1',
      company_compliance_id: 'comp1',
      name: 'Form ADV Annual Amendment',
      detail:
        'Submit annual update to Form ADV including any material changes to business operations, investment strategies, or personnel.',
      due_date: tomorrow.toISOString(),
      status: 'pending',
      assigned_to: 'John Doe',
      period_type: 'annual',
      documents: [
        {
          id: 'doc1',
          document_name: 'Draft_ADV_2024.pdf',
          document_url: '#',
          notes: 'Initial draft for review',
          uploaded_at: today.toISOString(),
          uploaded_by: 'John Doe',
        },
      ],
    },
    {
      id: '2',
      company_compliance_id: 'comp2',
      name: 'Quarterly Investment Committee Meeting',
      detail:
        'Hold quarterly investment committee meeting and document investment decisions and portfolio reviews.',
      due_date: nextWeek.toISOString(),
      status: 'pending',
      assigned_to: 'Jane Smith',
      period_type: 'quarterly',
      documents: [],
    },
    {
      id: '3',
      company_compliance_id: 'comp3',
      name: 'Client Advisory Fee Disclosure',
      detail:
        'Send annual fee disclosure to all advisory clients as required by state regulations.',
      due_date: lastWeek.toISOString(),
      status: 'pending',
      assigned_to: 'Mike Johnson',
      period_type: 'annual',
      documents: [],
    },
    {
      id: '4',
      company_compliance_id: 'comp4',
      name: 'Form U4 Update',
      detail:
        'Update Form U4 for new representative with recent employment history and disclosures.',
      due_date: completed.toISOString(),
      status: 'submitted',
      assigned_to: 'Sarah Wilson',
      period_type: 'as-needed',
      documents: [
        {
          id: 'doc2',
          document_name: 'U4_Amendment_Complete.pdf',
          document_url: '#',
          notes: 'Completed and submitted to FINRA',
          uploaded_at: completed.toISOString(),
          uploaded_by: 'Sarah Wilson',
        },
      ],
    },
    {
      id: '5',
      company_compliance_id: 'comp5',
      name: 'Annual Compliance Review',
      detail:
        'Conduct comprehensive annual review of compliance policies and procedures.',
      due_date: today.toISOString(),
      status: 'pending',
      assigned_to: 'Alex Brown',
      period_type: 'annual',
      documents: [],
    },
  ];
};

export function useComplianceTasks(companyId: string | undefined) {
  const [complianceTasks, setComplianceTasks] = useState<ComplianceTask[]>([]);
  const [pastDueTasks, setPastDueTasks] = useState<ComplianceTask[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<ComplianceTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ComplianceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'upcoming' | 'all' | 'completed'>(
    'upcoming',
  );

  // Format date for display
  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    return format(date, 'MMM d, yyyy');
  }, []);

  // Function to fetch documents for all tasks
  const fetchDocumentsForTasks = useCallback(
    async (tasks: ComplianceTask[]): Promise<ComplianceTask[]> => {
      setDocumentsLoading(true);
      try {
        // Get all task IDs (these are the company_compliance_date_id values)
        const taskIds = tasks.map((task) => task.id);

        // Fetch all documents for these task IDs in a single query
        const { data: documents, error } = await supabase
          .from('compliance_documents')
          .select('*')
          .in('company_compliance_date_id', taskIds)
          .order('uploaded_at', { ascending: false });

        if (error) {
          console.error('Error fetching documents:', error);
          return tasks;
        }

        if (!documents || documents.length === 0) {
          return tasks;
        }

        // Create a map of task ID to documents
        const documentsMap = new Map<string, ComplianceDocument[]>();

        // Group documents by their company_compliance_date_id
        documents.forEach((doc) => {
          const taskId = doc.company_compliance_date_id;
          if (!documentsMap.has(taskId!)) {
            documentsMap.set(taskId!, []);
          }
          documentsMap.get(taskId!)!.push(doc);
        });

        // Add documents to tasks
        return tasks.map((task) => ({
          ...task,
          documents: documentsMap.get(task.id) || [],
        }));
      } catch (error) {
        console.error('Error fetching documents for tasks:', error);
        return tasks;
      } finally {
        setDocumentsLoading(false);
      }
    },
    [],
  );

  // Function to fetch compliance tasks
  const fetchComplianceTasks = useCallback(async () => {
    if (!companyId) return;

    try {
      // Get all company compliance items with their definitions and dates
      const { data, error } = await supabase
        .from('company_compliance')
        .select(
          `
          *,
          compliance_definitions:compliance_definition_id(id, name, detail),
          company_compliance_dates(id, date, status)
        `,
        )
        .eq('company_id', companyId);

      if (error) {
        console.log('Compliance ERROR', error);

        // In development mode, use mock data if Supabase fails
        if (import.meta.env.DEV) {
          console.log('Using mock compliance tasks for development');
          const mockTasks = createMockTasks();

          // Filter tasks into categories
          const today = new Date();

          const activeTasks = mockTasks.filter(
            (task: any) => task.status !== 'submitted',
          );

          const pastDueWithDocs = activeTasks.filter((task: any) => {
            const dueDate = new Date(task.due_date);
            return isPast(dueDate) && !isToday(dueDate);
          });

          const upcomingWithDocs = activeTasks.filter((task: any) => {
            const dueDate = new Date(task.due_date);
            return isToday(dueDate) || dueDate > today;
          });

          const completedWithDocs = mockTasks
            .filter((task: any) => task.status === 'submitted')
            .slice(0, 20);

          setComplianceTasks(mockTasks);
          setPastDueTasks(pastDueWithDocs);
          setUpcomingTasks(upcomingWithDocs);
          setCompletedTasks(completedWithDocs);
          setLoading(false);
          return;
        }

        setLoading(false);
        return;
      }

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
          status: dateItem.status || 'pending',
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

      // Fetch documents for all tasks
      const tasksWithDocuments = await fetchDocumentsForTasks(transformedTasks);

      // Apply the same filtering to tasks with documents
      const activeTasks = tasksWithDocuments.filter(
        (task: any) => task.status !== 'submitted',
      );

      const pastDueWithDocs = activeTasks.filter((task: any) => {
        const dueDate = new Date(task.due_date);
        return isPast(dueDate) && !isToday(dueDate);
      });

      const upcomingWithDocs = activeTasks.filter((task: any) => {
        const dueDate = new Date(task.due_date);
        return isToday(dueDate) || dueDate > today;
      });

      const completedWithDocs = tasksWithDocuments
        .filter((task: any) => task.status === 'submitted')
        .slice(0, 20);

      setComplianceTasks(tasksWithDocuments);
      setPastDueTasks(pastDueWithDocs);
      setUpcomingTasks(upcomingWithDocs);
      setCompletedTasks(completedWithDocs);
    } catch (error) {
      console.error('Error fetching compliance tasks:', error);

      // In development mode, use mock data if there's an error
      if (import.meta.env.DEV) {
        console.log('Using mock compliance tasks due to error in development');
        const mockTasks = createMockTasks();

        // Filter tasks into categories
        const today = new Date();

        const activeTasks = mockTasks.filter(
          (task: any) => task.status !== 'submitted',
        );

        const pastDueWithDocs = activeTasks.filter((task: any) => {
          const dueDate = new Date(task.due_date);
          return isPast(dueDate) && !isToday(dueDate);
        });

        const upcomingWithDocs = activeTasks.filter((task: any) => {
          const dueDate = new Date(task.due_date);
          return isToday(dueDate) || dueDate > today;
        });

        const completedWithDocs = mockTasks
          .filter((task: any) => task.status === 'submitted')
          .slice(0, 20);

        setComplianceTasks(mockTasks);
        setPastDueTasks(pastDueWithDocs);
        setUpcomingTasks(upcomingWithDocs);
        setCompletedTasks(completedWithDocs);
      }
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  // Function to mark a task as complete
  const markTaskComplete = useCallback(
    async (userId: string, dateId: string) => {
      // In development mode, just update the local state
      if (import.meta.env.DEV) {
        console.log('Mock: Marking task complete for date ID:', dateId);

        // Update local state to mark task as completed
        setComplianceTasks((prev) =>
          prev.map((task) =>
            task.id === dateId
              ? { ...task, status: 'submitted' as const }
              : task,
          ),
        );

        // Refresh the categorized tasks
        setTimeout(() => {
          fetchComplianceTasks();
        }, 100);

        return;
      }

      try {
        console.log(
          'Starting markTaskComplete for date ID:',
          dateId,
          'by user:',
          userId,
        );

        const currentDate = new Date().toISOString();
        console.log('Using timestamp:', currentDate);

        // Update the status in company_compliance_dates
        const { error: dateUpdateError } = await supabase
          .from('company_compliance_dates')
          .update({
            status: 'submitted',
          })
          .eq('id', dateId);

        if (dateUpdateError) {
          console.error(
            'Error updating company_compliance_dates status:',
            dateUpdateError,
          );
          throw dateUpdateError;
        }

        console.log(
          'Successfully updated company_compliance_dates status for date ID:',
          dateId,
        );

        // Add entry to compliance_history table with company_compliance_date_id
        const { data: historyData, error: historyError } = await supabase
          .from('compliance_history')
          .insert({
            company_compliance_date_id: dateId,
            status: 'submitted',
            performed_by: userId,
            action_date: currentDate,
            notes: 'Task completed via DrawingBoard app',
          })
          .select();

        if (historyError) {
          console.error(
            'Error inserting into compliance_history:',
            historyError,
          );
          throw historyError;
        }

        console.log(
          'Successfully added compliance history entry:',
          historyData,
        );

        // Wait a moment for the database to update before refreshing
        setTimeout(() => {
          fetchComplianceTasks();
          console.log('Tasks refreshed successfully');
        }, 500);
      } catch (error) {
        console.error('Error marking task as complete:', error);
      }
    },
    [fetchComplianceTasks],
  );

  // Effect to refresh tasks when view mode changes
  useEffect(() => {
    if (companyId) {
      fetchComplianceTasks();
    }
  }, [viewMode, companyId, fetchComplianceTasks]);

  return {
    complianceTasks,
    pastDueTasks,
    upcomingTasks,
    completedTasks,
    loading,
    documentsLoading,
    viewMode,
    setViewMode,
    formatDate,
    fetchComplianceTasks,
    markTaskComplete,
  };
}
