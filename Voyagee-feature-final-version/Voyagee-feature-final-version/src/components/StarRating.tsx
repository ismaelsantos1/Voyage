import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRating: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({ rating, onRating, readonly }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isHighlighted = readonly ? rating >= star : (hover ?? rating) >= star;
  
        return (
          <button
            key={star}
            type="button"
            className={`p-1 transition-colors ${readonly ? 'cursor-default' : ''}`}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(null)}
            onClick={() => !readonly && onRating(star)}
            disabled={readonly}
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                isHighlighted
                  ? 'fill-yellow-400 text-yellow-400'
                  : readonly 
                    ? 'fill-gray-200 text-gray-200' 
                    : 'fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200'
              }`}
            />
          </button>
        );
      })}
      {!readonly && (
        <span className="text-sm text-gray-600 ml-2">
          {rating} de 5 estrelas
        </span>
      )}
    </div>
  );
}