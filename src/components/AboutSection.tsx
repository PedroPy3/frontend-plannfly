
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white scroll-reveal">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">Plannfly</span>
          </h2>
          <p className="text-lg text-gray-600">
            Plannfly is designed for educators who want to focus on teaching, 
            not administrative tasks. Our platform streamlines your workflow 
            and enhances the learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow scroll-reveal">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mb-6 bg-plannfly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-plannfly-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Facil de começar</h3>
              <p className="text-gray-600 text-center">
                Comece em minutos, nós fazemos o trabalho pesado! 
                Nossa plataforma é fácil de usar e não requer experiência técnica.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow scroll-reveal">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mb-6 bg-plannfly-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-plannfly-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Tudo em uma solução</h3>
              <p className="text-gray-600 text-center">
                Replace multiple tools with a single platform that handles 
                Substitua multiplas ferramentas por uma única plataforma que lida com
                tudo da gestao de alunos, pagamentos, agendamentos e comunicação.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow scroll-reveal">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mb-6 bg-plannfly-lightpurple bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-plannfly-lightpurple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Custo-Beneficio</h3>
              <p className="text-gray-600 text-center">
                Economize tempo e dinheiro com uma plataforma que centraliza
                todas as suas necessidades administrativas.
                A plataforma Plannfly é acessível e oferece planos para todos os orçamentos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
