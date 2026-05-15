interface ribbitMascotProps {
  className?: string;
  mood?: 'happy' | 'sad' | 'thinking';
  color?: string;
  accessory?: string;
}

export default function ribbitMascot({
  className,
  mood = 'happy',
  color = '#4ade80',
  accessory = 'none',
}: ribbitMascotProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <ellipse cx="50" cy="60" rx="35" ry="30" fill={color} stroke="#312e81" strokeWidth="4" />
        <circle cx="35" cy="35" r="12" fill={color} stroke="#312e81" strokeWidth="4" />
        <circle cx="65" cy="35" r="12" fill={color} stroke="#312e81" strokeWidth="4" />
        <circle cx="35" cy="35" r="6" fill="white" stroke="#312e81" strokeWidth="2" />
        <circle cx="65" cy="35" r="6" fill="white" stroke="#312e81" strokeWidth="2" />
        <circle cx="35" cy="35" r="3" fill="#312e81" />
        <circle cx="65" cy="35" r="3" fill="#312e81" />

        {accessory === 'glasses' && (
          <path d="M25 35 H45 M55 35 H75 M45 35 Q50 35 55 35" stroke="#312e81" strokeWidth="3" fill="none" />
        )}
        {accessory === 'cap' && (
          <path d="M30 25 Q50 15 70 25 L75 30 L25 30 Z" fill="#312e81" />
        )}
        {accessory === 'headphones' && (
          <path d="M20 40 Q20 15 50 15 Q80 15 80 40" stroke="#312e81" strokeWidth="6" fill="none" />
        )}
        {accessory === 'beret' && (
          <ellipse cx="50" cy="22" rx="20" ry="8" fill="#312e81" />
        )}
        {accessory === 'ribbon' && (
          <path d="M65 20 L75 25 L65 30 L55 25 Z" fill="#f472b6" stroke="#312e81" strokeWidth="2" />
        )}

        {mood === 'happy' && (
          <path d="M35 65 Q50 75 65 65" stroke="#312e81" strokeWidth="4" fill="none" strokeLinecap="round" />
        )}
        {mood === 'sad' && (
          <path d="M35 72 Q50 62 65 72" stroke="#312e81" strokeWidth="4" fill="none" strokeLinecap="round" />
        )}
        {mood === 'thinking' && (
          <rect x="40" y="65" width="20" height="4" fill="#312e81" rx="2" />
        )}
      </svg>
    </div>
  );
}
