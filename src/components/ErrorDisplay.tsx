
import React from 'react';
import { Button } from '@/components/ui/button';

type ErrorDisplayProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

const ErrorDisplay = ({ 
  title = "Error loading data", 
  message = "Failed to load data. Please try again.",
  onRetry
}: ErrorDisplayProps) => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-semibold mb-2">
            {title}
          </div>
          <p className="text-muted-foreground mb-4">
            {message}
          </p>
          <Button onClick={onRetry || (() => window.location.reload())}>
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
</rov-write>

Create a ClassCard component:

<lov-write file_path="src/components/ClassCard.tsx">
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ChevronDownIcon, ChevronUpIcon, PowerIcon, PlayIcon, EditIcon } from 'lucide-react';

type ClassCardProps = {
  classItem: any;
  isExpanded: boolean;
  onToggleExpansion: (classId: string) => void;
  onEdit: (classItem: any, event: React.MouseEvent) => void;
  onStatusToggle: (classId: string, newStatus: 'active' | 'inactive', className: string) => void;
};

const ClassCard = ({ 
  classItem, 
  isExpanded, 
  onToggleExpansion, 
  onEdit, 
  onStatusToggle 
}: ClassCardProps) => {
  return (
    <Card
      className="hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={(e) => onEdit(classItem, e)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg cursor-pointer" onClick={() => onToggleExpansion(classItem.id)}>
            {classItem.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              classItem.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {classItem.status}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(classItem, e);
              }}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${classItem.status === 'active' ? 'hover:text-destructive' : 'hover:text-green-600'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {classItem.status === 'active'
                    ? <PowerIcon className="h-4 w-4" />
                    : <PlayIcon className="h-4 w-4" />}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {classItem.status === 'active' ? 'Deactivate' : 'Activate'} Class
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to {classItem.status === 'active' ? 'deactivate' : 'activate'} "
                    {classItem.title}"?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      onStatusToggle(
                        classItem.id,
                        classItem.status === 'active' ? 'inactive' : 'active',
                        classItem.title
                      )
                    }
                    className={`${
                      classItem.status === 'active'
                        ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpansion(classItem.id);
              }}
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Teacher:</strong> {classItem.teacher || '—'}</p>
          <p><strong>Students:</strong> {classItem.students || 0}</p>
          <p><strong>Date:</strong> {
            classItem.date 
              ? new Date(classItem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : '—'
          }</p>
          {classItem.description && (
            <p><strong>Description:</strong> {classItem.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
