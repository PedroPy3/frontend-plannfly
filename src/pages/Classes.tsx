
import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import ClassEditDialog from '../components/ClassEditDialog';
import AddClassModal from '../components/AddClassModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { BookOpenIcon, UsersIcon, ClockIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, PowerIcon, PlayIcon, EditIcon, PlusIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';

const ClassesContent = () => {
  const { toast } = useToast();

  const { data: classes = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['classes-summary'],
    queryFn: () => api.get('/classes/summary'),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      // await api.post(`/classes/${classId}/status`, { status: newStatus });
      toast({
        title: `Class ${newStatus}`,
        description: `${className} has been marked as ${newStatus}`,
        className: 'border-primary text-primary',
      });
    } catch (err) {
      toast({ title: 'Error', description: `Failed to change class status`, variant: 'destructive' });
    }
  };

  const handleAddClassSuccess = () => {
    refetch(); // Refresh the classes list
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-96 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-semibold mb-2">
              Error loading classes
            </div>
            <p className="text-muted-foreground mb-4">
              {error?.message || 'Failed to load classes. Please try again.'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Classes</h1>
            <p className="text-muted-foreground">
              Manage and view all your classes. Click on a class card to edit its details.
            </p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Class
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClasses}</div>
              <p className="text-xs text-muted-foreground">
                {classes.filter((c: any) => c.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgDuration} min</div>
              <p className="text-xs text-muted-foreground">Per class session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeekSessions}</div>
              <p className="text-xs text-muted-foreground">Scheduled sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Classes List */}
        {!classes || classes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpenIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-lg font-semibold mb-2">No classes found</div>
            <p className="text-muted-foreground mb-4">
              Your classes will appear here once they're loaded from the API.
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Your First Class
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem: any) => {
              const isExpanded = expandedCards.has(classItem.id);
              return (
                <Card
                  key={classItem.id}
                  className="hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={(e) => handleCardClick(classItem, e)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg cursor-pointer" onClick={() => toggleCardExpansion(classItem.id)}>
                        {classItem.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          classItem.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {classItem.status}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(classItem, e);
                          }}
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-8 w-8 ${classItem.status === 'active' ? 'hover:text-destructive' : 'hover:text-green-600'}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {classItem.status === 'active'
                                ? <PowerIcon className="h-4 w-4" />
                                : <PlayIcon className="h-4 w-4" />}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {classItem.status === 'active' ? 'Deactivate' : 'Activate'} Class
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to {classItem.status === 'active' ? 'deactivate' : 'activate'} "
                                {classItem.title}"?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleStatusToggle(
                                    classItem.id,
                                    classItem.status === 'active' ? 'inactive' : 'active',
                                    classItem.title
                                  )
                                }
                                className={`${
                                  classItem.status === 'active'
                                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardExpansion(classItem.id);
                          }}
                        >
                          {isExpanded ? (
                            <ChevronUpIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Instructor:</strong> {classItem.instructor || '—'}</p>
                      <p><strong>Students:</strong> {classItem.students || 0}</p>
                      <p><strong>Date:</strong> {
                        classItem.date 
                          ? new Date(classItem.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : '—'
                      }</p>
                      {classItem.description && (
                        <p><strong>Description:</strong> {classItem.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <ClassEditDialog
          classData={selectedClass}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveClass}
        />

        <AddClassModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddClassSuccess}
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
