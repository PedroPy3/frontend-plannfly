
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, dateFns } from 'react-big-calendar';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { Plus } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import ScheduleEventModal from '@/components/ScheduleEventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFns();

interface Class {
  id: string;
  title: string;
  date: string;
  description: string;
  duration: number;
}

interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    type: 'class';
    data: Class;
  };
}

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: () => api.get('/classes'),
  });

  // Transform classes into calendar events
  const events: ScheduleEvent[] = React.useMemo(() => {
    if (!classes) return [];
    
    return classes.map((classItem: Class) => {
      const startDate = parseISO(classItem.date);
      const endDate = new Date(startDate.getTime() + classItem.duration * 60000); // duration in minutes
      
      return {
        id: classItem.id,
        title: classItem.title,
        start: startDate,
        end: endDate,
        resource: {
          type: 'class',
          data: classItem,
        },
      };
    });
  }, [classes]);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: ScheduleEvent) => {
    toast({
      title: "Class Details",
      description: `${event.title} - ${event.resource.data.description}`,
    });
  };

  const eventStyleGetter = (event: ScheduleEvent) => {
    return {
      style: {
        backgroundColor: 'hsl(var(--primary))',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'hsl(var(--primary-foreground))',
        border: '0px',
        display: 'block',
      },
    };
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg font-semibold">Loading schedule...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-600 mt-1">Manage your classes and events</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Register New Event
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '600px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day']}
                defaultView="month"
                date={currentDate}
                onNavigate={setCurrentDate}
                popup
                showMultiDayTimes
                step={60}
                timeslots={1}
              />
            </div>
          </CardContent>
        </Card>

        <ScheduleEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
