
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UsersIcon, UserIcon, SearchIcon, UserPlusIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AvailableStudent {
  id: number;
  name: string;
  email: string;
  grade: string;
}

interface StudentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
  className: string;
  onStudentAdded: () => void;
}

// TODO: Replace with actual API call
const MOCK_AVAILABLE_STUDENTS: AvailableStudent[] = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", grade: "Grade 10" },
  { id: 2, name: "Bob Wilson", email: "bob.wilson@example.com", grade: "Grade 11" },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", grade: "Grade 9" },
  { id: 4, name: "Diana Prince", email: "diana.prince@example.com", grade: "Grade 12" },
  { id: 5, name: "Edward Smith", email: "edward.smith@example.com", grade: "Grade 10" },
  { id: 6, name: "Fiona Davis", email: "fiona.davis@example.com", grade: "Grade 11" },
  { id: 7, name: "George Miller", email: "george.miller@example.com", grade: "Grade 9" },
  { id: 8, name: "Helen Garcia", email: "helen.garcia@example.com", grade: "Grade 12" },
];

const StudentSelectionModal = ({ isOpen, onClose, classId, className, onStudentAdded }: StudentSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  // TODO: Replace with actual API call
  // const { data: availableStudents, isLoading } = useQuery({
  //   queryKey: ['available-students', classId],
  //   queryFn: () => fetchAvailableStudents(classId),
  // });

  const filteredStudents = MOCK_AVAILABLE_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentToggle = (studentId: number) => {
    const newSelected = new Set(selectedStudents);
    if (selectedStudents.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const handleAddStudents = async () => {
    if (selectedStudents.size === 0) {
      toast({
        title: "No students selected",
        description: "Please select at least one student to add",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await addStudentsToClass(classId, Array.from(selectedStudents));
      
      const studentsCount = selectedStudents.size;
      const studentText = studentsCount === 1 ? 'student' : 'students';
      
      toast({
        title: "Students added",
        description: `${studentsCount} ${studentText} added to ${className}`,
        className: "border-primary text-primary",
      });
      
      onStudentAdded();
      setSelectedStudents(new Set());
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add students to class",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setSelectedStudents(new Set());
    setSearchTerm('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlusIcon className="h-5 w-5" />
            Add Students to {className}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selection Summary */}
          {selectedStudents.size > 0 && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary">
                {selectedStudents.size} student{selectedStudents.size !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}

          {/* Students List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => {
              const isSelected = selectedStudents.has(student.id);
              return (
                <Card 
                  key={student.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleStudentToggle(student.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-xs text-muted-foreground">{student.grade}</p>
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'bg-primary border-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {isSelected && (
                          <div className="h-2 w-2 bg-primary-foreground rounded-sm" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No students found matching your search.' : 'No available students to add.'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddStudents}
              disabled={selectedStudents.size === 0}
            >
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Add {selectedStudents.size > 0 ? `(${selectedStudents.size})` : 'Students'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentSelectionModal;