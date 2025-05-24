
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

// This will be replaced with actual API data in the future
const mockSubscriptions = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: 'month',
    description: 'Perfect for individual tutors',
    features: [
      'Up to 30 students',
      'Basic classroom management',
      'Payment processing',
      'Email notifications',
      '5GB storage'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$79',
    period: 'month',
    description: 'Best for small schools',
    popular: true,
    features: [
      'Up to 100 students',
      'Advanced classroom tools',
      'Payment processing',
      'WhatsApp notifications',
      '20GB storage',
      'Priority support',
      'Analytics dashboard'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199',
    period: 'month',
    description: 'For larger institutions',
    features: [
      'Unlimited students',
      'All Professional features',
      'White-labeling',
      'API access',
      '100GB storage',
      '24/7 priority support',
      'Custom integrations',
      'Dedicated account manager'
    ]
  }
];

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Plannfly - Subscriptions";
    
    // This will be replaced with an actual API call in the future
    // const fetchSubscriptions = async () => {
    //   try {
    //     const response = await fetch('/api/subscriptions');
    //     const data = await response.json();
    //     setSubscriptions(data);
    //   } catch (error) {
    //     console.error('Error fetching subscriptions:', error);
    //   }
    // };
    // 
    // fetchSubscriptions();
  }, []);

  const handleSubscribe = (subscriptionId: string) => {
    // Navigate to the checkout page with the selected subscription
    navigate(`/checkout/${subscriptionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="text-gradient">Subscription</span>
            </h1>
            <p className="text-lg text-gray-600">
              Select the plan that works best for your educational business.
              All plans include our core features with no hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptions.map((subscription) => (
              <Card 
                key={subscription.id} 
                className={`border ${subscription.popular ? 'border-2 border-plannfly-blue shadow-lg' : 'border-gray-200 shadow-sm hover:shadow-md'} transition-all`}
              >
                {subscription.popular && (
                  <div className="absolute top-0 right-0 mt-4 mr-4 bg-plannfly-blue text-white text-xs px-2 py-1 rounded">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <h3 className="text-xl font-bold">{subscription.name}</h3>
                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-4xl font-bold">{subscription.price}</span>
                    <span className="text-gray-500 ml-2">/{subscription.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{subscription.description}</p>
                </CardHeader>
                <CardContent className="pt-0 pb-6">
                  <ul className="space-y-3">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className={`w-full ${subscription.popular ? 'bg-plannfly-blue hover:bg-plannfly-purple' : 'border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white'}`}
                    variant={subscription.popular ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(subscription.id)}
                  >
                    Start Now!
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default SubscriptionsPage;
