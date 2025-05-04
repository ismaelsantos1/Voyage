import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { UserProfile, ProfileUpdateData, ApiResponse } from '../types/user';
import { Edit2, Save, X } from 'lucide-react';

export default function Profile() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ProfileUpdateData>({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get<ApiResponse<UserProfile>>(`/auth/users/${authUser?.id}`);
      setUser(response.data.user);
      initializeFormData(response.data.user);
    } catch (err) {
      setError('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const initializeFormData = (userData: UserProfile) => {
    setFormData({
      nome: userData.nome,
      telefone: userData.telefone || '',
      biografia: userData.biografia || '',
      ...(userData.tipo === 'guia' && {
        endereco: {
          cep: userData.cep || '',
          pais: userData.pais || '',
          estado: userData.estado || '',
          cidade: userData.cidade || '',
          bairro: userData.bairro || '',
          rua: userData.rua || '',
          numero: userData.endereco_numero || '',
          complemento: userData.complemento || ''
        }
      })
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('endereco.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.patch('/auth/profile', formData);
      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
        setError('');
      }
    } catch (err) {
      setError('Erro ao atualizar perfil');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  if (!user) return <div className="flex justify-center items-center h-screen">Usuário não encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit2 size={20} />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  initializeFormData(user);
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <X size={20} />
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                <Save size={20} />
                Salvar
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Informações Básicas */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{user.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CPF</label>
                <p className="mt-1 text-gray-900">{user.cpf}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{user.telefone || '-'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                <p className="mt-1 text-gray-900">{user.data_nascimento}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
                <p className="mt-1 text-gray-900 capitalize">{user.tipo}</p>
              </div>
            </div>
          </section>

          {/* Biografia */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Sobre Mim</h2>
            {isEditing ? (
              <textarea
                name="biografia"
                value={formData.biografia || ''}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Conte um pouco sobre você..."
              />
            ) : (
              <p className="mt-1 text-gray-900">{user.biografia || '-'}</p>
            )}
          </section>

          {/* Informações Específicas de Guia */}
          {user.tipo === 'guia' && (
            <>
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Informações Profissionais</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Anos de Experiência</label>
                    <p className="mt-1 text-gray-900">{user.anos_experiencia || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Avaliação Média</label>
                    <p className="mt-1 text-gray-900">{user.avaliacao_media ? `${user.avaliacao_media}/5` : '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Avaliações</label>
                    <p className="mt-1 text-gray-900">{user.numero_avaliacoes || '0'}</p>
                  </div>
                </div>
              </section>

              {/* Endereço */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Endereço</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'CEP', name: 'endereco.cep' },
                    { label: 'País', name: 'endereco.pais' },
                    { label: 'Estado', name: 'endereco.estado' },
                    { label: 'Cidade', name: 'endereco.cidade' },
                    { label: 'Bairro', name: 'endereco.bairro' },
                    { label: 'Rua', name: 'endereco.rua' },
                    { label: 'Número', name: 'endereco.numero' },
                    { label: 'Complemento', name: 'endereco.complemento' }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={field.name}
                          value={formData.endereco?.[field.name.split('.')[1] as keyof typeof formData.endereco] || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {user[field.name.split('.')[1] as keyof typeof user] || '-'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}