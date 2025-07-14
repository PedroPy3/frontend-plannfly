
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersIcon, CalendarIcon, BookOpenIcon, SaveIcon, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StudentManagementModal from './StudentManagementModal';

interface ClassData {
  id: number;
  name: string;
  teacher: string;
  students: number;
  duration: string;
  schedule: string;
  status: string;
}

interface ClassEditDialogProps {
  classData: ClassData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedClass: ClassData) => void;
}

const DURATION_OPTIONS = [
  { value: "10 min", label: "10 minutes" },
  { value: "15 min", label: "15 minutes" },
  { value: "20 min", label: "20 minutes" },
  { value: "25 min", label: "25 minutes" },
  { value: "30 min", label: "30 minutes" },
  { value: "35 min", label: "35 minutes" },
  { value: "40 min", label: "40 minutes" },
  { value: "45 min", label: "45 minutes" },
  { value: "50 min", label: "50 minutes" },
  { value: "55 min", label: "55 minutes" },
  { value: "60 min", label: "60 minutes" },
];

// TODO: Replace with actual API call
const MOCK_TEACHERS = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Michael Chen" },
  { id: 3, name: "Emily Rodriguez" },
  { id: 4, name: "David Thompson" },
  { id: 5, name: "Lisa Anderson" },
  { id: 6, name: "James Wilson" },
  { id: 7, name: "Maria Garcia" },
  { id: 8, name: "Robert Kim" },
];

const ClassEditDialog = ({ classData, isOpen, onClose, onSave }: ClassEditDialogProps) => {
  const [editedClass, setEditedClass] = useState<ClassData | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (classData) {
      setEditedClass({ ...classData });
    }
  }, [classData]);

  const handleSave = async () => {
    if (!editedClass) return;

    try {
      // TODO: Replace with actual API call
      // await updateClass(editedClass.id, editedClass);
      
      onSave(editedClass);
      
      toast({
        title: "Class updated",
        description: `${editedClass.name} has been updated successfully`,
        className: "border-primary text-primary",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update class",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof ClassData, value: string | number) => {
    if (!editedClass) return;
    
    setEditedClass(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  if (!editedClass) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5" />
              Edit Class: {editedClass.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Class Name</label>
                  <Input
                    value={editedClass.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter class name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teacher</label>
                  <Select
                    value={editedClass.teacher}
                    onValueChange={(value) => handleInputChange('teacher', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_TEACHERS.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.name}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Select
                    value={editedClass.duration}
                    onValueChange={(value) => handleInputChange('duration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Students Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UsersIcon className="h-5 w-5" />
                  Students Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Total Students: {editedClass.students}</p>
                    <p className="text-sm text-muted-foreground">
                      Manage enrollment and student details
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsStudentModalOpen(true)}
                  >
                    <UsersIcon className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Schedule Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Class Schedule</label>
                  <Input
                    value={editedClass.schedule}
                    onChange={(e) => handleInputChange('schedule', e.target.value)}
                    placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
                  />
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Schedule Preview</p>
                  <div className="text-sm">
                    <p><strong>Current Schedule:</strong> {editedClass.schedule}</p>
                    <p className="text-muted-foreground mt-1">
                      Schedule data will be populated from API response
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                <XIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <StudentManagementModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        classId={editedClass.id}
        className={editedClass.name}
      />
    </>
  );
};

export default ClassEditDialog;