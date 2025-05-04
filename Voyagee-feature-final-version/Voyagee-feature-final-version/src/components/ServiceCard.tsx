import { 
        Hotel, 
        Flag,
        DirectionsCar,
        Train,
        Restaurant,
        Event
      } from '@mui/icons-material';
      
      interface ServiceCardProps {
        title: string;
        iconType: 'hotel' | 'flag' | 'car' | 'train' | 'restaurant' | 'event';
      }
      
      const ServiceCard = ({ title, iconType }: ServiceCardProps) => {
        const getIcon = () => {
          switch (iconType) {
            case 'hotel':
              return <Hotel sx={{ fontSize: 40 }} />;
            case 'flag':
              return <Flag sx={{ fontSize: 40 }} />;
            case 'car':
              return <DirectionsCar sx={{ fontSize: 40 }} />;
            case 'train':
              return <Train sx={{ fontSize: 40 }} />;
            case 'restaurant':
              return <Restaurant sx={{ fontSize: 40 }} />;
            case 'event':
              return <Event sx={{ fontSize: 40 }} />;
            default:
              return null;
          }
        };
      
        return (
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
            <div className="mb-6 text-blue-500">
              {getIcon()}
            </div>
            <h3 className="font-semibold text-gray-800 text-xl">{title}</h3>
          </div>
        );
      };
      
      export default ServiceCard;