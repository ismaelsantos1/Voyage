// components/Signup/steps/UserTypeStep.tsx
import { User, MapPin } from 'lucide-react';
import { UserType, FormErrors } from '../../../types/signup';

interface UserTypeStepProps {
    onSelect: (type: UserType) => void;
    errors: FormErrors;
}

const UserTypeStep = ({ onSelect, errors }: UserTypeStepProps) => (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-center mb-6">
            Você é um viajante ou guia turístico?
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <button
                type="button"
                onClick={() => onSelect('tourist')}
                className={`p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center ${
                    errors.userType ? 'border-red-500' : ''
                }`}
            >
                <User className="mx-auto h-8 w-8 mb-2" />
                <span className="font-medium">Viajante</span>
            </button>
            <button
                type="button"
                onClick={() => onSelect('guide')}
                className={`p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center ${
                    errors.userType ? 'border-red-500' : ''
                }`}
            >
                <MapPin className="mx-auto h-8 w-8 mb-2" />
                <span className="font-medium">Guia Turístico</span>
            </button>
        </div>
        {errors.userType && (
            <p className="mt-1 text-sm text-red-500">{errors.userType}</p>
        )}
    </div>
);

export default UserTypeStep;