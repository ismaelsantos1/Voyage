import { ChangeEvent } from 'react';

interface DocumentsStepProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DocumentsStep = ({ onChange }: DocumentsStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium mb-4">Documentação</h3>
    <p className="text-sm text-gray-600 mb-4">
      Por favor, envie documentos que comprovem sua atuação como guia turístico.
    </p>
    <p className="text-sm text-gray-600 mb-4">
      Você poderá enviar seus documentos posteriormente através da sua página de perfil.
    </p>
    <input
      type="file"
      multiple
      onChange={onChange}
      className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
    />
  </div>
);

export default DocumentsStep;