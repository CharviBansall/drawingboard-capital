interface LoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({ size = 60, className = '' }: LoaderProps) {
  return (
    <div
      className={`custom-loader ${className}`}
      style={{ width: `${size}px` }}
    />
  );
}
