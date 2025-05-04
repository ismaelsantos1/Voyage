import {
    Building2,
    Car,
    Package,
    Phone,
    Info,
    Facebook,
    Twitter,
    Instagram,
    Mail,
    MapPin,
    ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = {
        servicos: [
            { name: 'Hotéis', href: '/hoteis', icon: <Building2 size={18} /> },
            { name: 'Pacotes', href: '/pacotes', icon: <Package size={18} /> },
            { name: 'Veículos', href: '/veiculos', icon: <Car size={18} /> },
        ],
        suporte: [
            { name: 'Contato', href: '/contato', icon: <Phone size={18} /> },
            { name: 'Sobre nós', href: '/sobre', icon: <Info size={18} /> },
        ],
        social: [
            { name: 'Facebook', href: '#', icon: <Facebook size={20} /> },
            { name: 'Twitter', href: '#', icon: <Twitter size={20} /> },
            { name: 'Instagram', href: '#', icon: <Instagram size={20} /> },
        ],
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Newsletter Section */}
                <div className="max-w-4xl mx-auto mb-16 bg-blue-500/10 p-4 sm:p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-center mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">
                            Inscreva-se em nossa newsletter
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Receba roteiros exclusivos e dicas de viagem
                        </p>
                    </div>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <span>Inscrever</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center max-w-6xl mx-auto">
                    {/* Coluna Voyagee */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                            Voyagee
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Sua melhor experiência em viagens começa aqui.
                            Descubra destinos incríveis e crie memórias
                            inesquecíveis.
                        </p>
                        <div className="space-y-3">
                            <a
                                href="mailto:contato@voyagee.com"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <Mail size={18} />
                                contato@voyagee.com
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <MapPin size={18} />
                                Natal, RN - Brasil
                            </a>
                        </div>
                    </div>

                    {/* Coluna Serviços */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-6">Serviços</h4>
                        <ul className="space-y-4">
                            {footerLinks.servicos.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                                        {link.icon}
                                        <span>{link.name}</span>
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna Suporte */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-6">Suporte</h4>
                        <ul className="space-y-4">
                            {footerLinks.suporte.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                                        {link.icon}
                                        <span>{link.name}</span>
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna Redes Sociais */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-6">
                            Redes Sociais
                        </h4>
                        <div className="flex gap-4">
                            {footerLinks.social.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="bg-white/10 p-3 rounded-lg hover:bg-blue-500 transition-colors"
                                    aria-label={link.name}>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                        <p>© 2024 Voyagee. Todos os direitos reservados.</p>
                        <div className="flex gap-6">
                            <a
                                href="#"
                                className="hover:text-white transition-colors">
                                Termos de Uso
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors">
                                Política de Privacidade
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
