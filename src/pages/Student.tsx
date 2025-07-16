
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '@/components/StatsCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorDisplay from '@/components/ErrorDisplay';
import StudentCard from '@/components/StudentCard';
import { Input } from '@/components/ui/input';
import { UsersIcon, SearchIcon, UserIcon } from 'lucide-react';
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
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  if (isError) {
    navigate('/session-expired');
    return null;
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingSkeleton 
          title="Students" 
          description="Manage and view all your students" 
          statsCount={3}
        />
      </DashboardLayout>
    );
  }

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = students.length;
  const activeStudents = students.filter((s: any) => s.status === 'Active').length;
  const totalEnrollments = students.reduce((sum: number, s: any) => sum + s.enrolledClasses, 0);

  const handleManageStudent = (student: any) => {
    setSelectedStudent(student);
    setIsManagementDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Students</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard
              title="Total Students"
              value={totalStudents}
              icon={UsersIcon}
            />
            <StatsCard
              title="Active Students"
              value={activeStudents}
              icon={UserIcon}
            />
            <StatsCard
              title="Total Enrollments"
              value={totalEnrollments}
              icon={UsersIcon}
            />
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
              <StudentCard
                key={student.id}
                student={student}
                onManage={handleManageStudent}
              />
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
