
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpenIcon, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Class {
  id: number;
  name: string;
  schedule: string;
  instructor: string;
  isEnrolled: boolean;
}

interface ClassSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: number;
  studentName: string;
  onClassesUpdated: () => void;
}

// TODO: Replace with actual API call
const MOCK_AVAILABLE_CLASSES: Class[] = [
  { id: 1, name: "Mathematics", schedule: "Mon, Wed, Fri 9:00 AM", instructor: "Dr. Smith", isEnrolled: true },
  { id: 2, name: "Physics", schedule: "Tue, Thu 2:00 PM", instructor: "Prof. Johnson", isEnrolled: true },
  { id: 3, name: "Chemistry", schedule: "Mon, Wed 11:00 AM", instructor: "Dr. Brown", isEnrolled: false },
  { id: 4, name: "Biology", schedule: "Tue, Thu 10:00 AM", instructor: "Prof. Davis", isEnrolled: false },
  { id: 5, name: "History", schedule: "Wed, Fri 1:00 PM", instructor: "Dr. Wilson", isEnrolled: false },
  { id: 6, name: "English", schedule: "Mon, Wed, Fri 2:00 PM", instructor: "Prof. Miller", isEnrolled: false },
];

const ClassSelectionModal = ({ isOpen, onClose, studentId, studentName, onClassesUpdated }: ClassSelectionModalProps) => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>(MOCK_AVAILABLE_CLASSES);
  const [isLoading, setIsLoading] = useState(false);

  const handleClassToggle = async (classId: number, isCurrentlyEnrolled: boolean) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    console.log(`${isCurrentlyEnrolled ? 'Removing' : 'Adding'} student ${studentId} ${isCurrentlyEnrolled ? 'from' : 'to'} class ${classId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setClasses(prev => prev.map(cls => 
      cls.id === classId ? { ...cls, isEnrolled: !isCurrentlyEnrolled } : cls
    ));
    
    const className = classes.find(cls => cls.id === classId)?.name;
    toast({
      title: isCurrentlyEnrolled ? "Removed from Class" : "Added to Class",
      description: `${studentName} ${isCurrentlyEnrolled ? 'removed from' : 'added to'} ${className} successfully.`,
    });
    
    setIsLoading(false);
    onClassesUpdated();
  };

  const enrolledCount = classes.filter(cls => cls.isEnrolled).length;
  const availableCount = classes.filter(cls => !cls.isEnrolled).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5" />
            Manage Classes - {studentName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                Enrolled: {enrolledCount}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Available: {availableCount}
              </Badge>
            </div>
          </div>

          {/* Enrolled Classes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Enrolled Classes</h3>
            <div className="space-y-3">
              {classes.filter(cls => cls.isEnrolled).map((classItem) => (
                <Card key={classItem.id} className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={true}
                          onCheckedChange={() => handleClassToggle(classItem.id, true)}
                          disabled={isLoading}
                        />
                        <div>
                          <h4 className="font-medium">{classItem.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            <CalendarIcon className="h-3 w-3 inline mr-1" />
                            {classItem.schedule}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Instructor: {classItem.instructor}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Enrolled
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {classes.filter(cls => cls.isEnrolled).length === 0 && (
                <p className="text-muted-foreground text-center py-4">No classes enrolled yet.</p>
              )}
            </div>
          </div>

          {/* Available Classes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Available Classes</h3>
            <div className="space-y-3">
              {classes.filter(cls => !cls.isEnrolled).map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={false}
                          onCheckedChange={() => handleClassToggle(classItem.id, false)}
                          disabled={isLoading}
                        />
                        <div>
                          <h4 className="font-medium">{classItem.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            <CalendarIcon className="h-3 w-3 inline mr-1" />
                            {classItem.schedule}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Instructor: {classItem.instructor}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        Available
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {classes.filter(cls => !cls.isEnrolled).length === 0 && (
                <p className="text-muted-foreground text-center py-4">All classes are enrolled.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassSelectionModal;