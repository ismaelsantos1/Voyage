// components/Signup/steps/PasswordStep.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormData, FormErrors } from '../../../types/signup';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordStepProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

export const PasswordStep = ({ formData, onChange, errors }: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="password" className="sr-only">Senha</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Crie uma senha"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirme sua senha"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          checked={formData.terms}
          onChange={onChange}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          Eu concordo com os{' '}
          <Link to="/termos" className="font-medium text-blue-500 hover:text-blue-600">
            termos de uso
          </Link>{' '}
          e{' '}
          <Link to="/privacidade" className="font-medium text-blue-500 hover:text-blue-600">
            política de privacidade
          </Link>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
      )}

      <div className="mt-1 text-sm text-gray-600">
        <p>Sua senha deve conter:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Pelo menos 8 caracteres</li>
          <li>Pelo menos uma letra maiúscula</li>
          <li>Pelo menos uma letra minúscula</li>
          <li>Pelo menos um número</li>
          <li>Pelo menos um caractere especial</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStep;