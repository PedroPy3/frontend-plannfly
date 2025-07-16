import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UsersIcon, SearchIcon, UserIcon, SettingsIcon } from 'lucide-react';
import StudentManagementDialog from '@/components/StudentManagementDialog';
import { api } from '@/lib/api';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isManagementDialogOpen, setIsManagementDialogOpen] = useState(false);

  const navigate = useNavigate();

  const { data: students = [], isLoading, isError } = useQuery({
    queryKey: ['students-summary'],
    queryFn: () => api.get('/students/summary'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  if (isError) {
    navigate('/session-expired');
    return null;
  }

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = students.length;
  const activeStudents = students.filter((s: any) => s.status === 'Active').length;
  const totalEnrollments = students.reduce((sum: number, s: any) => sum + s.enrolledClasses, 0);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Students</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeStudents}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrollments}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student: any) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-plannfly-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-plannfly-700" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                    </div>
                    <Badge
                      variant={student.status === 'Active' ? 'default' : 'secondary'}
                      className={student.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'}
                    >
                      {student.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Enrolled Classes:</span>
                      <span className="font-semibold">{student.enrolledClasses}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Join Date:</span>
                      <span>{student.joinDate}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => {
                    setSelectedStudent(student);
                    setIsManagementDialogOpen(true);
                  }}>
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Manage Student
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <StudentManagementDialog
        isOpen={isManagementDialogOpen}
        onClose={() => setIsManagementDialogOpen(false)}
        student={selectedStudent}
        onStudentUpdated={() => console.log('Refetch data aqui')}
      />
    </DashboardLayout>
  );
};

export default Students;
