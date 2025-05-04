// components/Signup/steps/LocationStep.tsx
import { FormData, FormErrors, UserType } from '../../../types/signup';
import InputMask from 'react-input-mask';
import { Mail, MapPin } from 'lucide-react';

interface LocationStepProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userType: UserType | null;
  errors: FormErrors;
}

const InputField = ({ 
  icon, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  required = true,
  error,
  mask
}: {
  icon?: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  mask?: string;
}) => (
  <div>
    <label htmlFor={name} className="sr-only">
      {placeholder}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          {icon}
        </div>
      )}
      {mask ? (
        <InputMask
          mask={mask}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-3 ${
            icon ? 'pl-10' : ''
          } border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-3 ${
            icon ? 'pl-10' : ''
          } border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder={placeholder}
        />
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const AddressFields = ({ formData, onChange, errors }: Pick<LocationStepProps, 'formData' | 'onChange' | 'errors'>) => (
  <div className="space-y-4">
    <h4 className="font-medium">Endereço Profissional</h4>

    <div className="grid grid-cols-2 gap-4">
      <InputField
        icon={<MapPin className="h-5 w-5 text-gray-400" />}
        name="zipCode"
        value={formData.zipCode}
        onChange={onChange}
        placeholder="CEP"
        mask="99999-999"
        error={errors.zipCode}
      />

      <InputField
        icon={<MapPin className="h-5 w-5 text-gray-400" />}
        name="bairro"
        value={formData.bairro || ''}
        onChange={onChange}
        placeholder="Bairro"
        error={errors.bairro}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InputField
        name="country"
        value={formData.country}
        onChange={onChange}
        placeholder="País"
        error={errors.country}
      />

      <InputField
        name="state"
        value={formData.state}
        onChange={onChange}
        placeholder="Estado"
        error={errors.state}
      />

      <InputField
        name="city"
        value={formData.city}
        onChange={onChange}
        placeholder="Cidade"
        error={errors.city}
      />
    </div>

    <InputField
      name="streetAddress"
      value={formData.streetAddress}
      onChange={onChange}
      placeholder="Endereço"
      error={errors.streetAddress}
    />

    <div className="grid grid-cols-2 gap-4">
      <InputField
        name="number"
        value={formData.number}
        onChange={onChange}
        placeholder="Número"
        error={errors.number}
      />

      <InputField
        name="complement"
        value={formData.complement || ''}
        onChange={onChange}
        placeholder="Complemento (opcional)"
        required={false}
      />
    </div>
  </div>
);

const LocationStep = ({ formData, onChange, userType, errors }: LocationStepProps) => (
  <div className="space-y-6">
    <InputField
      icon={<Mail className="h-5 w-5 text-gray-400" />}
      name="email"
      value={formData.email}
      onChange={onChange}
      placeholder="Email"
      type="email"
      error={errors.email}
    />

    {userType === 'guide' && (
      <AddressFields
        formData={formData}
        onChange={onChange}
        errors={errors}
      />
    )}
  </div>
);

export default LocationStep;