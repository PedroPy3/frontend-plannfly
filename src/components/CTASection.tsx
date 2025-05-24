
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-plannfly-blue to-plannfly-purple text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar seu negócio educacional?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Faça parte de milhares de educadores que estão economizando tempo e crescendo seus negócios com o Plannfly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-plannfly-blue hover:bg-gray-100">
              Vamos começar!
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-plannfly-blue">
              Fale com um especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
