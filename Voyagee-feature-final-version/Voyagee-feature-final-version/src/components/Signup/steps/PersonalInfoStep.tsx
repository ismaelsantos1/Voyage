// components/Signup/steps/PersonalInfoStep.tsx
import { FormData, FormErrors } from '../../../types/signup';
import InputMask from 'react-input-mask';
import { User, Phone } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

const PersonalInfoStep = ({ formData, onChange, errors }: PersonalInfoStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>

    <div>
      <label htmlFor="name" className="sr-only">Nome completo</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nome completo"
        />
      </div>
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
      )}
    </div>

    <div>
      <label htmlFor="cpf" className="sr-only">CPF</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <InputMask
          mask="999.999.999-99"
          id="cpf"
          name="cpf"
          required
          value={formData.cpf}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="CPF"
        />
      </div>
      {errors.cpf && (
        <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
      )}
    </div>

    <div>
      <label htmlFor="phone" className="sr-only">Telefone</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Phone className="h-5 w-5 text-gray-400" />
        </div>
        <InputMask
          mask="(99) 99999-9999"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Telefone"
        />
      </div>
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
      )}
    </div>
  </div>
);
export default PersonalInfoStep;