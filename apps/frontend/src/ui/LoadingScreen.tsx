import Loader from '../components/Loader';

interface LoadingScreenProps {
  size?: number;
  message?: string;
  className?: string;
}

export default function LoadingScreen({ 
  size = 100, 
  message, 
  className = '' 
}: LoadingScreenProps) {
  return (
    <div className={`h-fit min-h-screen overflow-hidden min-w-screen flex flex-col items-center justify-center ${className}`}>
      <Loader size={size} />
      {message && (
        <p className="mt-4 text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
}
