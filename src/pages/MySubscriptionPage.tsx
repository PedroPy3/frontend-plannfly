import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Crown, AlertTriangle } from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

const MySubscriptionPage = () => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // Fetch current subscription
  const { data: currentSubscription, isLoading: loadingCurrent } = useQuery({
    queryKey: ['current-subscription'],
    queryFn: () => api.get('/subscription/current'),
  });

  // Fetch available plans
  const { data: availablePlans = [], isLoading: loadingPlans } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => api.get('/subscription/plans'),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleUpgrade = (planId: string) => {
    // Navigate to upgrade flow
    console.log('Upgrading to plan:', planId);
  };

  const handleCancelSubscription = () => {
    // Handle cancellation logic
    console.log('Cancelling subscription');
    setCancelModalOpen(false);
  };

  if (loadingCurrent || loadingPlans) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading subscription details...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">My Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing preferences
          </p>
        </div>

        {/* Current Subscription Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Current Subscription</h2>
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  {currentSubscription?.planName || 'Professional Plan'}
                </CardTitle>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="font-semibold">${currentSubscription?.amount || '79'}/month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing</p>
                    <p className="font-semibold">
                      {currentSubscription?.nextBilling ? formatDate(currentSubscription.nextBilling) : 'Feb 15, 2025'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Started</p>
                    <p className="font-semibold">
                      {currentSubscription?.startDate ? formatDate(currentSubscription.startDate) : 'Jan 15, 2025'}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Included Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                  {(currentSubscription?.features || [
                    'Up to 100 students',
                    'Advanced classroom tools',
                    'Payment processing',
                    'WhatsApp notifications',
                    '20GB storage',
                    'Priority support'
                  ]).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* More Plans Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Upgrade Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePlans.map((plan: any) => (
              <Card key={plan.id} className={`${plan.popular ? 'border-2 border-primary' : 'border border-border'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-base font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={plan.id === currentSubscription?.planId}
                  >
                    {plan.id === currentSubscription?.planId ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cancel Subscription Section */}
        <section>
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Once you cancel your subscription, you'll lose access to premium features at the end of your current billing period.
              </p>
              <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    Cancel My Subscription
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Cancel Subscription
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>Are you sure you want to cancel your subscription?</p>
                    
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <h4 className="font-medium">Subscription Details:</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Plan:</strong> {currentSubscription?.planName || 'Professional Plan'}</p>
                        <p><strong>Next Billing:</strong> {currentSubscription?.nextBilling ? formatDate(currentSubscription.nextBilling) : 'Feb 15, 2025'}</p>
                        <p><strong>Access Until:</strong> {currentSubscription?.accessUntil ? formatDate(currentSubscription.accessUntil) : 'Feb 15, 2025'}</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> Your subscription will remain active until {currentSubscription?.accessUntil ? formatDate(currentSubscription.accessUntil) : 'Feb 15, 2025'}. 
                        After this date, you'll lose access to premium features but can reactivate anytime.
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
                      Keep Subscription
                    </Button>
                    <Button variant="destructive" onClick={handleCancelSubscription}>
                      Yes, Cancel Subscription
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default MySubscriptionPage;