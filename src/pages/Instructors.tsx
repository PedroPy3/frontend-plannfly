import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { AddInstructorModal } from '@/components/AddInstructorModal';

interface Instructor {
  id: string;
  name: string;
  email: string;
  classes: Array<{
    id: string;
    name: string;
  }>;
}

const Instructors: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: instructors = [], isLoading, refetch } = useQuery({
    queryKey: ['instructors'],
    queryFn: () => api.get('/instructors'),
  });

  const handleInstructorAdded = () => {
    refetch();
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Instructors</h1>
            <p className="text-muted-foreground">Manage instructors and their class assignments</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            Add Instructor
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {instructors?.map((instructor: Instructor) => (
            <Card key={instructor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{instructor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{instructor.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Classes ({instructor.classes?.length || 0})</span>
                  </div>
                  <div className="space-y-2">
                    {instructor.classes?.length > 0 ? (
                      instructor.classes.map((cls) => (
                        <Badge 
                          key={cls.id} 
                          variant="secondary" 
                          className="mr-1 mb-1"
                        >
                          {cls.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No classes assigned</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {instructors?.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-2">No instructors found</h3>
              <p className="text-muted-foreground mb-4">Get started by adding your first instructor</p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                Add Instructor
              </Button>
            </div>
          </div>
        )}

        <AddInstructorModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          onInstructorAdded={handleInstructorAdded}
        />
      </div>
    </DashboardLayout>
  );
};

export default Instructors;