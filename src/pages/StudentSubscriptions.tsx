import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UsersIcon, PlusIcon, FilterIcon, UserIcon, CreditCardIcon, CalendarIcon, CheckCircle2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface StudentSubscription {
  id: string;
  studentName: string;
  studentEmail: string;
  subscriptionType: string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  amount: number;
  createdAt: string;
}

const StudentSubscriptions = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    subscriptionType: 'all',
    period: 'all'
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    studentEmail: '',
    subscriptionType: '',
    amount: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Main subscription data query
  const { data: subscriptions = [], isLoading, isError } = useQuery({
    queryKey: ['student-subscriptions', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.subscriptionType !== 'all') params.append('type', filters.subscriptionType);
      if (filters.period !== 'all') params.append('period', filters.period);
      
      const endpoint = `/subscriptions/students${params.toString() ? `?${params.toString()}` : ''}`;
      return api.get(endpoint);
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  // Available subscription types query
  const { data: subscriptionTypes = [] } = useQuery({
    queryKey: ['subscription-types'],
    queryFn: () => api.get('/subscriptions/types'),
    staleTime: 10 * 60 * 1000,
  });

  // Create subscription mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: (subscriptionData: any) => api.post('/subscriptions/students', subscriptionData),
    onSuccess: () => {
      setIsCreateModalOpen(false);
      setShowSuccessModal(true);
      setNewSubscription({ studentEmail: '', subscriptionType: '', amount: '' });
      queryClient.invalidateQueries({ queryKey: ['student-subscriptions'] });
      
      // Auto-hide success modal after 3 seconds
      setTimeout(() => setShowSuccessModal(false), 3000);
    },
    onError: () => {
      setIsCreateModalOpen(false);
      setShowErrorModal(true);
    }
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleCreateSubscription = () => {
    if (!newSubscription.studentEmail || !newSubscription.subscriptionType || !newSubscription.amount) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    createSubscriptionMutation.mutate({
      studentEmail: newSubscription.studentEmail,
      subscriptionType: newSubscription.subscriptionType,
      amount: parseFloat(newSubscription.amount)
    });
  };

  // Calculate statistics
  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter((s: StudentSubscription) => s.status === 'active').length,
    monthlyRevenue: subscriptions
      .filter((s: StudentSubscription) => s.status === 'active')
      .reduce((sum: number, s: StudentSubscription) => sum + s.amount, 0),
    newThisMonth: subscriptions.filter((s: StudentSubscription) => {
      const createdDate = new Date(s.createdAt);
      const now = new Date();
      return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
    }).length
  };

  if (isError) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-semibold mb-2">
              Error loading subscriptions
            </div>
            <p className="text-muted-foreground mb-4">
              Failed to load student subscriptions. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Student Subscriptions</h1>
              <p className="text-muted-foreground">
                Manage student subscriptions and billing across all programs
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-primary">
              <PlusIcon className="h-4 w-4 mr-2" />
              Register New Subscription
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeSubscriptions} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">Currently enrolled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">From active subscriptions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newThisMonth}</div>
                <p className="text-xs text-muted-foreground">New subscriptions</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subscription Type</label>
                  <Select value={filters.subscriptionType} onValueChange={(value) => handleFilterChange('subscriptionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {subscriptionTypes.map((type: any) => (
                        <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Period</label>
                  <Select value={filters.period} onValueChange={(value) => handleFilterChange('period', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions List */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((subscription: StudentSubscription) => (
                <Card key={subscription.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{subscription.studentName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{subscription.studentEmail}</p>
                      </div>
                      <Badge
                        variant={subscription.status === 'active' ? 'default' : 'secondary'}
                        className={subscription.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'}
                      >
                        {subscription.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{subscription.subscriptionType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">${subscription.amount}/month</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Start Date:</span>
                        <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">End Date:</span>
                        <span>{new Date(subscription.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && subscriptions.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="text-lg font-semibold mb-2">No subscriptions found</div>
              <p className="text-muted-foreground mb-4">
                No student subscriptions match your current filters.
              </p>
              <Button onClick={() => setFilters({ status: 'all', subscriptionType: 'all', period: 'all' })}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Create Subscription Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Register New Student Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Student Email</label>
              <Input
                type="email"
                placeholder="student@example.com"
                value={newSubscription.studentEmail}
                onChange={(e) => setNewSubscription(prev => ({ ...prev, studentEmail: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subscription Type</label>
              <Select value={newSubscription.subscriptionType} onValueChange={(value) => setNewSubscription(prev => ({ ...prev, subscriptionType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subscription type" />
                </SelectTrigger>
                <SelectContent>
                  {subscriptionTypes.map((type: any) => (
                    <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Amount ($)</label>
              <Input
                type="number"
                placeholder="99.99"
                value={newSubscription.amount}
                onChange={(e) => setNewSubscription(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateSubscription}
              disabled={createSubscriptionMutation.isPending}
            >
              {createSubscriptionMutation.isPending ? 'Creating...' : 'Create Subscription'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-sm text-center">
          <div className="py-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2Icon className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Success!</h3>
            <p className="text-muted-foreground">
              New subscription has been created successfully.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="max-w-sm text-center">
          <div className="py-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Oops, we had a problem!</h3>
            <p className="text-muted-foreground mb-4">
              There was an error creating the subscription. Please try again.
            </p>
            <Button onClick={() => setShowErrorModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentSubscriptions;