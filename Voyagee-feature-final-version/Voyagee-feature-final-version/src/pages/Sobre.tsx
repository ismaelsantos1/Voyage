import { Target, Users, Globe, Star } from 'lucide-react';

const Sobre = () => {
  const stats = [
    { label: 'Usuários Cadastrados', value: '1k+', icon: Users },
    { label: 'Destinos de Viagens', value: '100+', icon: Globe },
    { label: 'Roteiros Personalizados', value: '500+', icon: Target },
    { label: 'Experiência 5 Estrelas', value: '5+', icon: Star },
  ];

  /* Integrantes do projeto
  const team = [
    {
      name: 'Nome do Integrante',
      role: 'Cargo do Integrante',
      image: '/path-to-image.jpg',
      description: 'Descrição do integrante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    },
  ];*/

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossa História
            </h1>
            <p className="text-lg opacity-90">
              Nascemos com a missão de transformar sonhos em realidade, 
              conectando pessoas a destinos incríveis e criando experiências únicas.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <stat.icon className="text-blue-500" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-gray-600">
                Proporcionar experiências de viagem únicas e memoráveis, 
                conectando pessoas a destinos extraordinários com excelência 
                em serviço e atenção aos detalhes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Nossa Visão</h2>
              <p className="text-gray-600">
                Ser referência em turismo personalizado, reconhecida pela 
                inovação, qualidade e compromisso com a satisfação dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Excelência', 'Inovação', 'Compromisso'].map((value) => (
              <div key={value} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4">{value}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;