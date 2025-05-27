import Loader from '../components/Loader';

interface LoadingScreenProps {
  size?: number;
  message?: string;
  className?: string;
}

export default function LoadingScreen({
  size = 100,
  message,
  className = '',
}: LoadingScreenProps) {
  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden z-[1000000] bg-white bg-opacity-90 flex flex-col items-center justify-center ${className}`}
    >
      <Loader size={size} />
      {message && <p className="mt-4 text-gray-600 text-center">{message}</p>}
    </div>
  );
}
