import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contato = () => {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Estamos aqui para ajudar você a planejar a viagem dos seus sonhos. Entre em contato conosco!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Envie sua mensagem</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button className="w-full bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                Enviar Mensagem
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">contato@voyagee.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-gray-600">+55 (11) 9999-9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Endereço</h3>
                    <p className="text-gray-600">Av. Lorem Impsum, 1000 - Natal, RN</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="text-blue-500" />
                <h2 className="text-2xl font-bold">FAQs</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Qual o prazo de resposta?</h3>
                  <p className="text-gray-600">Respondemos todas as mensagens em até 24 horas úteis.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Como posso acompanhar minha solicitação?</h3>
                  <p className="text-gray-600">Você receberá um número de protocolo por email para acompanhamento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;