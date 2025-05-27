import { useRef, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import PageTitle from '@/components/PageTitle';
import RadioGroup from '@/components/RadioGroup';
import '@/styles/accordion.css';
import LoadingScreen from '@/ui/LoadingScreen';

import TaskList, { EmptyTaskList } from './components/TaskList';
import UploadModal from './components/UploadModal';
import CalendarView from './components/CalendarView';
import TaskDetailModal from './components/TaskDetailModal';
import { useComplianceTasks } from './hooks/useComplianceTasks';
import { useDocumentUpload } from './hooks/useDocumentUpload';

function ComplianceTasks() {
  const { profile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayMode, setDisplayMode] = useState<'list' | 'calendar'>('list');
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const {
    complianceTasks,
    pastDueTasks,
    upcomingTasks,
    completedTasks,
    loading,
    viewMode,
    setViewMode,
    formatDate,
    fetchComplianceTasks,
    markTaskComplete,
  } = useComplianceTasks(profile?.company_id!);

  const {
    uploadState,
    handleFileSelect,
    handleFileChange,
    handleNotesChange,
    saveEvidenceDocument,
    cancelUpload,
  } = useDocumentUpload(
    profile?.company_id!,
    profile?.id,
    fetchComplianceTasks,
  );

  // Handle file input change
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  // Handle task complete
  const onMarkComplete = (_complianceId: string, dateId: string) => {
    if (profile?.id) {
      markTaskComplete(profile.id, dateId);
    }
  };

  // Handle file selection
  const onAttachEvidence = (complianceId: string) => {
    handleFileSelect(complianceId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle view evidence (placeholder for now)
  const onViewEvidence = (complianceId: string) => {
    console.log('View evidence for task:', complianceId);
  };

  // Save document
  const onSaveDocument = () => {
    const allTasks = [...pastDueTasks, ...upcomingTasks, ...completedTasks];
    saveEvidenceDocument(allTasks);
  };

  return (
    <div className="w-full">
      {/* Hidden file input for document uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      {/* Evidence Upload Modal */}
      <UploadModal
        uploadState={uploadState}
        onCancel={cancelUpload}
        onSave={onSaveDocument}
        onNotesChange={handleNotesChange}
        onFileSelect={() => fileInputRef.current?.click()}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onMarkComplete={onMarkComplete}
        onAttachEvidence={onAttachEvidence}
        onViewEvidence={onViewEvidence}
      />

      <div className="flex justify-between w-full items-center mb-6">
        <PageTitle title="Compliance Tasks" />
        <div className="flex items-center space-x-4">
          {displayMode === 'list' && (
            <RadioGroup<'upcoming' | 'all' | 'completed'>
              options={[
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'all', label: 'All Tasks' },
                { value: 'completed', label: 'Completed' },
              ]}
              value={viewMode}
              onChange={setViewMode}
              name="viewMode"
            />
          )}
          <RadioGroup<'list' | 'calendar'>
            options={[
              { value: 'list', label: 'List' },
              { value: 'calendar', label: 'Calendar' },
            ]}
            value={displayMode}
            onChange={setDisplayMode}
            name="displayMode"
          />
        </div>
      </div>

      {loading ? (
        <LoadingScreen message="Loading Compliance Tasks..." />
      ) : !profile?.company_id ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-700">
            You need to be associated with a company to view compliance tasks.
          </p>
        </div>
      ) : (
        <div
          className={`${displayMode === 'calendar' ? 'w-full' : 'space-y-6'}`}
        >
          {displayMode === 'list' ? (
            <>
              {/* Past Due Tasks Section */}
              {pastDueTasks.length > 0 &&
                (viewMode === 'upcoming' || viewMode === 'all') && (
                  <TaskList
                    title="Past Due"
                    tasks={pastDueTasks}
                    formatDate={formatDate}
                    isPastDue={true}
                    onMarkComplete={onMarkComplete}
                    onAttachEvidence={onAttachEvidence}
                  />
                )}

              {/* Upcoming Tasks Section */}
              {upcomingTasks.length > 0 &&
                (viewMode === 'upcoming' || viewMode === 'all') && (
                  <TaskList
                    title="Upcoming"
                    tasks={upcomingTasks}
                    formatDate={formatDate}
                    onMarkComplete={onMarkComplete}
                    onAttachEvidence={onAttachEvidence}
                  />
                )}

              {/* Completed Tasks Section */}
              {completedTasks.length > 0 &&
                (viewMode === 'completed' || viewMode === 'all') && (
                  <TaskList
                    title="Completed"
                    tasks={completedTasks}
                    formatDate={formatDate}
                    isCompleted={true}
                    onViewEvidence={onViewEvidence}
                  />
                )}

              {/* No Tasks Message */}
              {complianceTasks.length === 0 && <EmptyTaskList />}
            </>
          ) : (
            <div className="w-full">
              <CalendarView
                tasks={
                  viewMode === 'upcoming'
                    ? [...pastDueTasks, ...upcomingTasks]
                    : viewMode === 'completed'
                      ? completedTasks
                      : complianceTasks
                }
                onTaskClick={setSelectedTask}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ComplianceTasks;
