import ServiceCard from '../components/ServiceCard';
import Search from '../components/Search/Search';
import HeroCarousel from '../components/Hero/HeroCarousel';

const Home = () => {
    const services = [
        { title: 'Reservas de Hotel', iconType: 'hotel' },
        { title: 'Pacotes de Viagem', iconType: 'flag' },
        { title: 'Locação de Veículos', iconType: 'car' },
        { title: 'Disponibilidade de Transporte Público', iconType: 'train' },
        { title: 'Melhores Restaurantes', iconType: 'restaurant' },
        { title: 'Eventos Acontecendo', iconType: 'event' },
    ] as const;

    const howItWorks = [
        {
            title: 'Planeje sua viagem',
            description:
                'Escolha seu destino, datas e preferências de hospedagem',
            icon: '✈️',
        },
        {
            title: 'Compare opções',
            description: 'Encontre as melhores ofertas e compare preços',
            icon: '🔍',
        },
        {
            title: 'Reserve com segurança',
            description: 'Faça sua reserva com garantia de melhor preço',
            icon: '🎯',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="container mx-auto px-8 py-20 max-w-7xl">
                    <HeroCarousel />
                </section>

                {/* Search Section */}
                <section className="container mx-auto px-8 py-16 max-w-7xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">
                            O que você quer encontrar?
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Encontre as melhores opções de hospedagem, passeios
                            e voos para a sua viagem.
                        </p>
                    </div>
                    <Search />
                </section>

                {/* How It Works Section */}
                <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                    <div className="container mx-auto px-8 max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">
                                Como funciona
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Planeje sua viagem em três passos simples e
                                aproveite ao máximo sua experiência
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 relative">
                            {/* Linha conectora */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -z-10"></div>

                            {howItWorks.map((step) => (
                                <div
                                    key={step.title}
                                    className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-white text-2xl">
                                        {step.icon}
                                    </div>
                                    <div className="text-center mt-6">
                                        <h3 className="text-xl font-semibold mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-8 max-w-7xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">
                                Facilite a sua viagem
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Nós te ajudamos a encontrar as melhores opções
                                para a sua viagem, com todo o suporte que você
                                precisa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    title={service.title}
                                    iconType={service.iconType}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Destinos Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-8 max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">
                                Destinos em destaque
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Descubra lugares incríveis com as melhores
                                ofertas
                            </p>
                        </div>

                        {/* Adicionar cards de destinos em destaque aqui */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
