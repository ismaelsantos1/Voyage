import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-6xl font-extrabold text-gray-900">404</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">Página não encontrada</p>
          <p className="mt-2 text-sm text-gray-600">
            Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;