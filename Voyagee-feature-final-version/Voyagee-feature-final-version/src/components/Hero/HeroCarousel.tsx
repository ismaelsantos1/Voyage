import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { destinations } from './hero';

// Definindo a interface do destino
interface Destination {
    id: number;
    title: string;
    state: string;
    description: string;
    image: string;
}

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [randomDestinations, setRandomDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        // Função para embaralhar array
        const shuffleArray = (array: Destination[]) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        // Embaralha e pega os primeiros 5 itens
        const shuffledDestinations = shuffleArray(destinations);
        setRandomDestinations(shuffledDestinations.slice(0, 5));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        cssEase: 'linear',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
        customPaging: (i: number) => (
            <div
                className={`w-3 h-3 rounded-full transition-all duration-300 mt-2 ${
                    i === currentSlide ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                }`}
            />
        ),
        appendDots: (dots: React.ReactNode) => (
            <div style={{ position: 'absolute', bottom: '-40px' }}>
                <ul style={{ margin: '0' }}>{dots}</ul>
            </div>
        )
    };

    // Não renderiza nada enquanto não tivermos os destinos aleatórios
    if (randomDestinations.length === 0) return null;

    return (
        <Slider {...settings} className="hero-carousel w-full">
            {randomDestinations.map((destination, index) => (
                <div key={destination.id} className="outline-none">
                    <div className={`grid md:grid-cols-2 gap-12 items-center ${
                        index % 2 === 0 ? '' : 'md:grid-flow-col-reverse'
                    }`}>
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Explore{' '}
                                <span className="text-blue-500 block mt-2">
                                    {destination.title}, {destination.state}
                                </span>
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {destination.description}
                            </p>
                            <div className="w-full">
                                <a href="/meus-roteiros" className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    Criar Roteiro
                                    <span className="text-xl">→</span>
                                </a>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src={destination.image}
                                alt={`${destination.title} - ${destination.state}`}
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default HeroCarousel;