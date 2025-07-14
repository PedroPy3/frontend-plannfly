
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UsersIcon, UserIcon } from 'lucide-react';
import StudentSelectionModal from './StudentSelectionModal';

interface Student {
  id: number;
  name: string;
  email: string;
  enrollmentDate: string;
}

interface StudentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
  className: string;
}

// TODO: Replace with actual API call
const MOCK_STUDENTS: Student[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", enrollmentDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", enrollmentDate: "2024-01-20" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", enrollmentDate: "2024-02-01" },
];

const StudentManagementModal = ({ isOpen, onClose, classId, className }: StudentManagementModalProps) => {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [students, setStudents] = useState(MOCK_STUDENTS);

  // TODO: Replace with actual API call
  // const { data: students, isLoading, refetch } = useQuery({
  //   queryKey: ['students', classId],
  //   queryFn: () => fetchStudentsByClass(classId),
  // });

  const handleStudentAdded = () => {
    // TODO: Refetch students data when real API is implemented
    // refetch();
    console.log('Students added - would refetch data here');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Manage Students - {className}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Total Students: {students.length}
              </p>
              <Button 
                variant="outline"
                onClick={() => setIsSelectionModalOpen(true)}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-8">
                <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No students enrolled in this class yet.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <StudentSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        classId={classId}
        className={className}
        onStudentAdded={handleStudentAdded}
      />
    </>
  );
};

export default StudentManagementModal;