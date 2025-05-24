
import { Separator } from "@/components/ui/separator";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-plannfly-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            As melhores <span className="text-gradient">Ferramentas</span> de gestão para o seu negócio educacional
          </h2>
          <p className="text-lg text-gray-600">
            Nossa plataforma é projetada para simplificar sua vida e maximizar seu tempo.
            Do gerenciamento de alunos à comunicação, temos tudo o que você precisa para ter sucesso.
          </p>
        </div>

        {/* Feature 1: Classroom Management */}
        <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 scroll-reveal">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              salas de aulas &amp; gerenciamento de alunos
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Organize suas aulas, acompanhe a frequência e gerencie o progresso dos alunos em um só lugar.
              Crie experiências de aprendizado personalizadas com nossas ferramentas de sala de aula intuitivas.
            </p>
            <ul className="space-y-3">
              {[
                "Ferramentas de comunicação",
                "Progresso do aluno",
                "Gerenciamento de frequência",
                "Gerenciamento de pagamentos",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-plannfly-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="rounded-lg overflow-hidden bg-plannfly-blue bg-opacity-5 p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-medium">Class Overview</div>
                    <div className="text-sm text-gray-500">25 Students</div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-plannfly-blue bg-opacity-20"></div>
                          <div className="ml-2">
                            <div className="h-2 w-24 bg-gray-200 rounded"></div>
                            <div className="h-2 w-16 bg-gray-200 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="h-2 w-12 bg-plannfly-blue rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 opacity-30" />

        {/* Feature 2: Payment Management */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-16 md:mb-24 scroll-reveal">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Gerenciamento simplificado de pagamentos
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Colete pagamentos, rastreie faturas e gerencie assinaturas sem complicações.
              Nosso sistema de pagamento seguro se integra a gateways de pagamento populares.
            </p>
            <ul className="space-y-3">
              {[
                "Cobrança reccorrente",
                "Multiplos métodos de pagamento",
                "Menor taxa do mercado",
                "Controle de faturas",
                "Relatorio financeiro",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-plannfly-purple mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="rounded-lg overflow-hidden bg-plannfly-purple bg-opacity-5 p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-medium mb-4">Payment Dashboard</div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-6"></div>
                  <div className="flex justify-between mb-6">
                    {["Pending", "Completed", "Overdue"].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className={`h-16 w-16 rounded-full mx-auto flex items-center justify-center 
                          ${index === 0 ? "bg-yellow-100 text-yellow-600" : 
                            index === 1 ? "bg-green-100 text-green-600" : 
                            "bg-red-100 text-red-600"}`}>
                          <div className="font-bold">{index === 0 ? "5" : index === 1 ? "24" : "2"}</div>
                        </div>
                        <div className="mt-2 text-sm">{item}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="h-2 w-24 bg-gray-200 rounded"></div>
                        <div className="h-2 w-12 bg-plannfly-purple rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 opacity-30" />

        {/* Feature 3: Scheduling and Notifications */}
        <div className="flex flex-col md:flex-row items-center scroll-reveal">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Agenda integrada &amp; Notificações no WhatsApp
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Nunca mais perca uma aula ou prazo com nosso sistema de agendamento.
              Envie lembretes e atualizações automatizadas diretamente para seus alunos via WhatsApp.
            </p>
            <ul className="space-y-3">
              {[
                "Calendarios integrados",
                "Lembretes automatizados",
                "Integracao com WhatsApp",
                "Templates personalizaveis",
                
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-plannfly-lightpurple mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="rounded-lg overflow-hidden bg-plannfly-lightpurple bg-opacity-5 p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="font-medium mb-4">Agenda e notificações</div>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                      <div key={index} className="text-center text-xs text-gray-500 font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 28 }).map((_, index) => (
                      <div 
                        key={index} 
                        className={`h-8 rounded flex items-center justify-center text-xs
                          ${[6, 13, 20].includes(index) ? "bg-plannfly-lightpurple bg-opacity-20 text-plannfly-lightpurple font-medium" : "bg-gray-50"}`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center p-2 bg-green-50 text-green-700 rounded text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                    </svg>
                    <span>Notificações do Whatsapp habilitada!</span>
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

export default FeaturesSection;
