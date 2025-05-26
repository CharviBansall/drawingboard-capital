/**
 * A consistent page title component used across the application
 * to maintain visual hierarchy and styling consistency.
 */
interface PageTitleProps {
  /** The title text to display */
  title: string;
  /** Optional additional className to apply custom styling. use sparingly */
  className?: string;
}

export default function PageTitle({ title, className = '' }: PageTitleProps) {
  return (
    <h1 className={`font-ebgaramond pb-6 text-4xl ${className}`}>{title}</h1>
  );
}
