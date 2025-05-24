import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-white to-plannfly-gray">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Gerenciar sua <span className="text-gradient">Escola</span> nunca foi tão fácil
            </h1>
            <div className="h-16 overflow-hidden mb-6 text-xl md:text-2xl text-gray-600">
              <div className="animate-carousel">
                <div className="h-16 flex items-center">Gestão de alunos</div>
                <div className="h-16 flex items-center">Gateways de pagamento</div>
                <div className="h-16 flex items-center">Agenda integrada</div>
                <div className="h-16 flex items-center">Notificações no Whatsapp</div>
              </div>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              A Plannfly é a plataforma de gestão educacional que simplifica sua rotina.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/subscriptions">
                <Button className="bg-plannfly-blue hover:bg-plannfly-purple text-lg py-6 px-8">
                  Comece aqui!
                </Button>
              </Link>
              <Button variant="outline" className="border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white text-lg py-6 px-8">
                Fale com um especialista
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-100 transform rotate-3 z-10">
                <div className="bg-plannfly-gray rounded-lg p-2">
                  <div className="h-64 bg-plannfly-blue bg-opacity-10 rounded flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-plannfly-blue bg-opacity-20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-plannfly-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-lg">Dashboard</h3>
                      <p className="text-gray-500">veja tudo em um só lugar</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 border border-gray-100 transform -rotate-2 z-0">
                <div className="bg-plannfly-gray rounded-lg p-2">
                  <div className="h-32 bg-plannfly-purple bg-opacity-10 rounded flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="font-medium text-plannfly-purple">Student Management Made Simple</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
