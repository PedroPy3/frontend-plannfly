
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

const CheckoutPage = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  
  useEffect(() => {
    document.title = "Plannfly - Checkout";
    
    // This would fetch subscription details and initiate checkout flow
    console.log(`Preparing checkout for subscription: ${subscriptionId}`);
  }, [subscriptionId]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Your <span className="text-gradient">Purchase</span>
            </h1>
            <p className="text-lg text-gray-600">
              You're just a few steps away from streamlining your education business.
            </p>
          </div>
          
          <div className="bg-plannfly-gray bg-opacity-10 rounded-lg p-8 mb-8">
            <p className="text-lg mb-4">
              You selected the <span className="font-semibold">{subscriptionId?.charAt(0).toUpperCase() + subscriptionId?.slice(1)}</span> plan.
            </p>
            <p className="text-gray-600 mb-8">
              This page will be implemented to handle the checkout process for your selected subscription.
              It will connect to the payment API and process your subscription.
            </p>
            
            <div className="flex justify-center">
              <Link to="/subscriptions">
                <Button variant="outline" className="mr-4 border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white">
                  Back to Plans
                </Button>
              </Link>
              <Button className="bg-plannfly-blue hover:bg-plannfly-purple">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default CheckoutPage;
