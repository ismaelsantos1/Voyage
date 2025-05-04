import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ScrollToTop from '../components/ScrollToTop';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Lazy loading
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Contato = lazy(() => import('../pages/Contato'));
const Sobre = lazy(() => import('../pages/Sobre'));
const Roteiros = lazy(() => import('../components/Roteiros/Roteiros'));
const Profile = lazy(() => import('../pages/Profile'));
const MeusRoteiros = lazy(() => import('../pages/MeusRoteiros'));

// Mapeamento de rotas para títulos
const getTitleByPath = (pathname: string): string => {
    switch (pathname) {
        case '/':
            return 'Melhore a sua experiência na hora de viajar';
        case '/login':
            return 'Fazer Login';
        case '/signup':
            return 'Cadastrar Usuário';
        case '/contato':
            return 'Contato';
        case '/sobre':
            return 'Sobre';
        case '/roteiro':
            return 'Roteiro';
        case '/profile':
            return 'Perfil';
        case '/meus-roteiros':
            return 'Meus Roteiros';
        default:
            return 'Voyagee';
    }
};

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

export function AppRoutes() {
    const location = useLocation();
    const pageTitle = getTitleByPath(location.pathname);

    return (
        <AuthProvider>
            <Helmet>
                <title>Voyagee | {pageTitle}</title>
            </Helmet>
            <ScrollToTop />
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="contato"
                        element={
                            <SuspenseWrapper>
                                <Contato />
                            </SuspenseWrapper>
                        }
                    />
                    <Route
                        path="sobre"
                        element={
                            <SuspenseWrapper>
                                <Sobre />
                            </SuspenseWrapper>
                        }
                    />
                    <Route
                        path="roteiros"
                        element={
                            <SuspenseWrapper>
                                <Roteiros />
                            </SuspenseWrapper>
                        }
                    />

                    {/* Rotas de Autenticação */}
                    <Route
                        path="login"
                        element={
                            <SuspenseWrapper>
                                <Login />
                            </SuspenseWrapper>
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            <SuspenseWrapper>
                                <Signup />
                            </SuspenseWrapper>
                        }
                    />

                    {/* Rotas Protegidas */}
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <SuspenseWrapper>
                                    <Profile />
                                </SuspenseWrapper>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="meus-roteiros"
                        element={
                            <ProtectedRoute>
                                <SuspenseWrapper>
                                    <MeusRoteiros />
                                </SuspenseWrapper>
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}
