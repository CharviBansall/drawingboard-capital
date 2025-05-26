import clsx from 'clsx';

/**
 * Interface for Avatar component props
 */
interface AvatarProps {
  /** Image source URL for the avatar */
  src?: string;

  /** Alternative text for the avatar image */
  alt?: string;

  /** Text initials to display when no image is provided
   * @default '??'
   */
  initials?: string;

  /** Size variant of the avatar
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Size mapping for different avatar size variants
 */
const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
};

/**
 * Avatar component for displaying user profile images or initials
 *
 * Renders either an image or text initials within a circular container.
 * Supports multiple size variants and gracefully falls back to initials when no image is provided.
 *
 * @example
 * <Avatar src="/path/to/image.jpg" alt="User Name" size="md" />
 * <Avatar initials="JD" size="lg" />
 */
export default function Avatar({
  src,
  alt = '',
  initials = '??',
  size = 'sm',
}: AvatarProps) {
  const sizeClass = sizeMap[size] || sizeMap['sm'];

  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden rounded-full bg-slate-300 font-medium dark:bg-slate-700 dark:text-white',
        sizeClass,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
