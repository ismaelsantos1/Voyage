// components/Search.tsx
import { useState } from 'react';
import { MapPin, Plane, Building, Car } from 'lucide-react';
import HotelSearch from './HotelSearch';
import FlightSearch from './FlightSearch';
import CarSearch from './CarSearch';
import PackageSearch from './PackageSearch';

type SearchType = 'stays' | 'flights' | 'cars' | 'packages';

const Search = () => {
  const [activeSearch, setActiveSearch] = useState<SearchType>('packages');

  const searchTypes = [
    { id: 'packages', label: 'Roteiros', icon: MapPin },
    { id: 'stays', label: 'Hotéis', icon: Building },
    { id: 'flights', label: 'Voos', icon: Plane },
    { id: 'cars', label: 'Carros', icon: Car },
  ] as const;

  const renderSearchContent = () => {
    switch (activeSearch) {
      case 'stays':
        return <HotelSearch />;
      case 'flights':
        return <FlightSearch />;
      case 'cars':
        return <CarSearch />;
      case 'packages':
        return <PackageSearch />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto -mt-8 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 mb-6 border-b">
          <div className="flex space-x-4 sm:space-x-6 pb-1 sm:pb-0">
            {searchTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSearch(id as SearchType)}
                className={`flex items-center space-x-2 pb-3 px-1 sm:px-2 whitespace-nowrap transition-colors min-w-fit
                  ${
                    activeSearch === id
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm sm:text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Content and Button */}
        <div className="relative space-y-4">
          {renderSearchContent()}
          <div className="flex justify-end mt-4 sm:mt-0">
            <button className="w-full sm:w-auto bg-blue-500 text-white px-4 sm:px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;