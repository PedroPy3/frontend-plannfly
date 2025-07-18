import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { AddTeacherModal } from '@/components/AddTeacherModal';

interface Teacher {
  id: string;
  name: string;
  email: string;
  classes: Array<{
    id: string;
    name: string;
  }>;
}

const Teachers: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: teachers, isLoading, refetch } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => api.get('/teachers'),
  });

  const handleTeacherAdded = () => {
    refetch();
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>
          <p className="text-muted-foreground">Manage teachers and their class assignments</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add Teacher
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teachers?.map((teacher: Teacher) => (
          <Card key={teacher.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen size={14} />
                  <span>Classes ({teacher.classes?.length || 0})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {teacher.classes?.length > 0 ? (
                    teacher.classes.map((cls) => (
                      <Badge key={cls.id} variant="secondary" className="text-xs">
                        {cls.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No classes assigned</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teachers?.length === 0 && (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No teachers found</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first teacher</p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Teacher
          </Button>
        </div>
      )}

      <AddTeacherModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTeacherAdded={handleTeacherAdded}
      />
    </div>
  );
};

export default Teachers;