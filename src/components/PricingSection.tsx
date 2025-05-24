
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Escolha o plano que melhor se adapta ao seu negócio.
            Todos os planos incluem nossos recursos principais sem custos a mais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all scroll-reveal">
            <CardHeader className="text-center pb-4">
              <h3 className="text-xl font-bold">Inicial</h3>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Perfeito para professores individuais</p>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <ul className="space-y-3">
                {[
                  "Up to 30 students",
                  "Basic classroom management",
                  "Payment processing",
                  "Email notifications",
                  "5GB storage"
                ].map((feature, index) => (
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
              <Button variant="outline" className="w-full border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card className="border-2 border-plannfly-blue shadow-lg relative scroll-reveal">
            <div className="absolute top-0 right-0 mt-4 mr-4 bg-plannfly-blue text-white text-xs px-2 py-1 rounded">
              Most Popular
            </div>
            <CardHeader className="text-center pb-4">
              <h3 className="text-xl font-bold">Professional</h3>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Best for small schools</p>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <ul className="space-y-3">
                {[
                  "Up to 100 students",
                  "Advanced classroom tools",
                  "Payment processing",
                  "WhatsApp notifications",
                  "20GB storage",
                  "Priority support",
                  "Analytics dashboard"
                ].map((feature, index) => (
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
              <Button className="w-full bg-plannfly-blue hover:bg-plannfly-purple">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all scroll-reveal">
            <CardHeader className="text-center pb-4">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">For larger institutions</p>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <ul className="space-y-3">
                {[
                  "Unlimited students",
                  "All Professional features",
                  "White-labeling",
                  "API access",
                  "100GB storage",
                  "24/7 priority support",
                  "Custom integrations",
                  "Dedicated account manager"
                ].map((feature, index) => (
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
              <Button variant="outline" className="w-full border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
