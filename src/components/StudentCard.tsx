
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserIcon, SettingsIcon } from 'lucide-react';

type StudentCardProps = {
  student: any;
  onManage: (student: any) => void;
};

const StudentCard = ({ student, onManage }: StudentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
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
        <Button className="w-full" onClick={() => onManage(student)}>
          <SettingsIcon className="h-4 w-4 mr-2" />
          Manage Student
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
