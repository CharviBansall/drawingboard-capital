/**
 * Props for the Throbber component
 */
interface ThrobberProps {
  /** Size of the throbber in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Color of the throbber (CSS color value) */
  color?: string;
}

/**
 * A loading indicator that can be customized with size and color
 */
export default function Throbber({ size = 10, className = '', color = 'currentColor' }: ThrobberProps) {
  return (
    <div
      className={`custom-throbber ${className}`}
      style={{
        width: `${size}px`,
        '--throbber-color': color
      } as React.CSSProperties}
    />
  );
}
