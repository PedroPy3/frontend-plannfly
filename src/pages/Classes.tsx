
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ClassEditDialog from '../components/ClassEditDialog';
import StatsCard from '@/components/StatsCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorDisplay from '@/components/ErrorDisplay';
import ClassCard from '@/components/ClassCard';
import { BookOpenIcon, UsersIcon, ClockIcon, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const ClassesContent = () => {
  const { toast } = useToast();

  const { data: classes = [], isLoading, isError, error } = useQuery({
    queryKey: ['classes-summary'],
    queryFn: () => api.get('/classes/summary'),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const stats = {
    totalClasses: classes.length,
    totalStudents: classes.reduce((sum: number, c: any) => sum + (c.students || 0), 0),
    avgDuration: classes.length > 0 ? Math.round(classes.reduce((sum: number, c: any) => sum + (c.duration || 0), 0) / classes.length) : 0,
    thisWeekSessions: classes.reduce((sum: number, c: any) => sum + (c.scheduledSessions || 0), 0)
  };

  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const toggleCardExpansion = (classId: string) => {
    const newExpanded = new Set(expandedCards);
    newExpanded.has(classId) ? newExpanded.delete(classId) : newExpanded.add(classId);
    setExpandedCards(newExpanded);
  };

  const handleCardClick = (classItem: any, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('button')) return;
    setSelectedClass(classItem);
    setIsEditDialogOpen(true);
  };

  const handleSaveClass = (updatedClass: any) => {
    toast({ title: 'Save class', description: 'Mock only – not persisted.', className: 'border-primary text-primary' });
  };

  const handleStatusToggle = async (classId: string, newStatus: 'active' | 'inactive', className: string) => {
    try {
      toast({
        title: `Class ${newStatus}`,
        description: `${className} has been marked as ${newStatus}`,
        className: 'border-primary text-primary',
      });
    } catch (err) {
      toast({ title: 'Error', description: `Failed to change class status`, variant: 'destructive' });
    }
  };

  if (isLoading) {
    return <LoadingSkeleton title="Classes" description="Manage and view all your classes" />;
  }

  if (isError) {
    return <ErrorDisplay title="Error loading classes" message={error?.message || 'Failed to load classes. Please try again.'} />;
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Classes</h1>
            <p className="text-muted-foreground">
              Manage and view all your classes. Click on a class card to edit its details.
            </p>
          </div>
          <div className="text-center py-12">
            <BookOpenIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-lg font-semibold mb-2">No classes found</div>
            <p className="text-muted-foreground">
              Your classes will appear here once they're loaded from the API.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Classes</h1>
          <p className="text-muted-foreground">
            Manage and view all your classes. Click on a class card to edit its details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Classes"
            value={stats.totalClasses}
            description={`${classes.filter((c: any) => c.status === 'active').length} active`}
            icon={BookOpenIcon}
          />
          <StatsCard
            title="Total Students"
            value={stats.totalStudents}
            description="Across all classes"
            icon={UsersIcon}
          />
          <StatsCard
            title="Avg Duration"
            value={`${stats.avgDuration} min`}
            description="Per class session"
            icon={ClockIcon}
          />
          <StatsCard
            title="This Week"
            value={stats.thisWeekSessions}
            description="Scheduled sessions"
            icon={CalendarIcon}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem: any) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              isExpanded={expandedCards.has(classItem.id)}
              onToggleExpansion={toggleCardExpansion}
              onEdit={handleCardClick}
              onStatusToggle={handleStatusToggle}
            />
          ))}
        </div>

        <ClassEditDialog
          classData={selectedClass}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveClass}
        />
      </div>
    </div>
  );
};

const Classes = () => {
  return (
    <DashboardLayout>
      <ClassesContent />
    </DashboardLayout>
  );
};

export default Classes;
