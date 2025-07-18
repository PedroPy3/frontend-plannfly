
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon, Users, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const scheduleEventSchema = z.object({
  type: z.enum(['class', 'student']),
  entityId: z.string().min(1, 'Please select an option'),
  date: z.date({
    required_error: 'Please select a date',
  }),
});

interface ScheduleEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Class {
  id: string;
  title: string;
  description: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

interface APIResponse {
  success: boolean;
  data: any;
  message: string;
}

const ScheduleEventModal = ({ isOpen, onClose }: ScheduleEventModalProps) => {
  const [activeTab, setActiveTab] = useState<'class' | 'student'>('class');
  const [showResult, setShowResult] = useState(false);
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof scheduleEventSchema>>({
    resolver: zodResolver(scheduleEventSchema),
    defaultValues: {
      type: 'class',
    },
  });

  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: () => api.get('/classes'),
    enabled: isOpen,
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => api.get('/students'),
    enabled: isOpen,
  });

  const createEventMutation = useMutation({
    mutationFn: (data: z.infer<typeof scheduleEventSchema>) => {
      const endpoint = data.type === 'class' ? '/schedule/class' : '/schedule/student';
      return api.post(endpoint, {
        entityId: data.entityId,
        date: data.date.toISOString(),
      });
    },
    onSuccess: (response) => {
      setApiResponse({
        success: true,
        data: response,
        message: 'Event created successfully',
      });
      setShowResult(true);
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast({
        title: 'Success',
        description: 'Event registered successfully',
      });
    },
    onError: (error: any) => {
      setApiResponse({
        success: false,
        data: error,
        message: error.message || 'Failed to create event',
      });
      setShowResult(true);
      toast({
        title: 'Error',
        description: 'Failed to register event',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof scheduleEventSchema>) => {
    createEventMutation.mutate(data);
  };

  const handleClose = () => {
    setShowResult(false);
    setApiResponse(null);
    form.reset();
    onClose();
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'class' | 'student');
    form.setValue('type', value as 'class' | 'student');
    form.setValue('entityId', '');
  };

  if (showResult && apiResponse) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Event Registration Result</DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center gap-2",
                apiResponse.success ? "text-green-600" : "text-red-600"
              )}>
                {apiResponse.success ? "✓ Success" : "✗ Error"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{apiResponse.message}</p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs font-mono">
                    {JSON.stringify(apiResponse.data, null, 2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Register New Event</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="class" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Class
                </TabsTrigger>
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <Users size={16} />
                  Student
                </TabsTrigger>
              </TabsList>

              <TabsContent value="class">
                <FormField
                  control={form.control}
                  name="entityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Class</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes?.map((classItem: Class) => (
                            <SelectItem key={classItem.id} value={classItem.id}>
                              {classItem.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="student">
                <FormField
                  control={form.control}
                  name="entityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Student</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a student" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students?.map((student: Student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} ({student.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createEventMutation.isPending}
              >
                {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleEventModal;
