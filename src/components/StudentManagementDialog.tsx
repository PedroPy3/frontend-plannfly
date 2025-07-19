
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserIcon, BookOpenIcon, CalendarIcon, SettingsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClassSelectionModal from './ClassSelectionModal';

interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  enrolledClasses: number;
  status: "Active" | "Inactive";
  joinDate: string;
  enrolledClassesList: Array<{ id: number; name: string; schedule: string; instructor?: string }>;
}

interface StudentManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onStudentUpdated: () => void;
}

// TODO: Replace with actual API call
const MOCK_ENROLLED_CLASSES = [
  { id: 1, name: "Mathematics", schedule: "Mon, Wed, Fri 9:00 AM", instructor: "Dr. Smith" },
  { id: 2, name: "Physics", schedule: "Tue, Thu 2:00 PM", instructor: "Prof. Johnson" },
  { id: 3, name: "Chemistry", schedule: "Mon, Wed 11:00 AM", instructor: "Dr. Brown" },
];

const StudentManagementDialog = ({ isOpen, onClose, student, onStudentUpdated }: StudentManagementDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    status: student?.status || 'Active'
  });
  const [enrolledClasses, setEnrolledClasses] = useState(MOCK_ENROLLED_CLASSES);
  const [isClassSelectionOpen, setIsClassSelectionOpen] = useState(false);

  React.useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone || '',
        status: student.status
      });
    }
  }, [student]);

  const handleSave = async () => {
    // TODO: Replace with actual API call
    console.log('Saving student data:', formData);
    toast({
      title: "Student Updated",
      description: "Student information has been successfully updated.",
    });
    onStudentUpdated();
    onClose();
  };

  const handleStatusToggle = async () => {
    const newStatus = formData.status === 'Active' ? 'Inactive' : 'Active';
    setFormData(prev => ({ ...prev, status: newStatus }));
    
    // TODO: Replace with actual API call
    toast({
      title: `Student ${newStatus === 'Active' ? 'Activated' : 'Deactivated'}`,
      description: `Student has been ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully.`,
    });
  };

  const handleRemoveFromClass = async (classId: number, className: string) => {
    // TODO: Replace with actual API call
    console.log('Removing student from class:', classId);
    
    setEnrolledClasses(prev => prev.filter(cls => cls.id !== classId));
    
    toast({
      title: "Removed from Class",
      description: `Student removed from ${className} successfully.`,
    });
    onStudentUpdated();
  };

  const handleClassesUpdated = () => {
    // TODO: Refresh enrolled classes data from API
    console.log('Classes updated - would refetch data here');
    onStudentUpdated();
  };

  if (!student) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Manage Student - {student.name}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Student Info</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Student Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter student name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Status</Label>
                        <div className="mt-1">
                          <Badge 
                            variant={formData.status === 'Active' ? 'default' : 'secondary'}
                            className={formData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {formData.status}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleStatusToggle}
                        className={formData.status === 'Active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {formData.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4 inline mr-1" />
                        Joined: {new Date(student.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button onClick={handleSave} className="flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpenIcon className="h-4 w-4" />
                      Enrolled Classes ({enrolledClasses.length})
                    </h3>
                    <Button onClick={() => setIsClassSelectionOpen(true)}>
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      Manage Classes
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {enrolledClasses.map((classItem) => (
                      <div key={classItem.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{classItem.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              <CalendarIcon className="h-3 w-3 inline mr-1" />
                              {classItem.schedule}
                            </p>
                            {classItem.instructor && (
                              <p className="text-sm text-muted-foreground">
                                Instructor: {classItem.instructor}
                              </p>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveFromClass(classItem.id, classItem.name)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {enrolledClasses.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpenIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No classes enrolled yet.</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsClassSelectionOpen(true)}
                        >
                          <BookOpenIcon className="h-4 w-4 mr-2" />
                          Enroll in Classes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Class Schedule
                  </h3>
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4" />
                    <p>Schedule view will be implemented here</p>
                    <p className="text-sm">Apple Calendar-style interface coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <ClassSelectionModal
        isOpen={isClassSelectionOpen}
        onClose={() => setIsClassSelectionOpen(false)}
        studentId={student?.id || 0}
        studentName={student?.name || ''}
        onClassesUpdated={handleClassesUpdated}
      />
    </>
  );
};

export default StudentManagementDialog;