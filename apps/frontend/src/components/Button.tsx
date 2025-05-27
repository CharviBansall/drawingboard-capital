import React, { ElementType, ComponentPropsWithoutRef } from 'react';
import Throbber from './Throbber';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps<C extends ElementType = 'button'> = {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   * @default 'small'
   */
  size?: ButtonSize;
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * The content of the button
   * @default 'Continue'
   */
  children?: React.ReactNode;
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Whether the button should take the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The element type to render as
   * @default 'button'
   */
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, 'className' | 'onClick' | 'disabled' | 'children'>;

/**
 * A versatile button component with multiple variants and states
 */
function Button<C extends ElementType = 'button'>({
  variant = 'primary',
  size = 'small',
  isLoading = false,
  disabled = false,
  onClick,
  children = 'Continue',
  className = '',
  fullWidth = false,
  as,
  ...props
}: ButtonProps<C>) {
  const baseStyles =
    'flex items-center justify-center gap-2 rounded-sm transition-all duration-200 ease-in-out font-medium whitespace-nowrap';

  const variantStyles = {
    primary: 'bg-blue-10 text-blue-1 hover:bg-blue-12',
    secondary: 'bg-blue-6 text-blue-12 hover:bg-blue-4',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-200',
    destructive: 'bg-red-800 text-white hover:bg-red-900',
  };

  const sizeStyles = {
    small: 'text-sm py-1 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6',
  };

  const widthStyles = fullWidth ? 'w-full' : 'w-auto';

  // Define throbber sizes based on button size
  const throbberSizes = {
    small: 12,
    medium: 16,
    large: 20,
  };

  // Define throbber colors based on button variant text colors
  const throbberColors = {
    primary: 'var(--color-blue-1)', // matches text-blue-1
    secondary: 'var(--color-blue-12)', // matches text-blue-12
    ghost: '#1a202c', // matches text-slate-900
    destructive: 'white', // matches text-white
  };

  const Component = as || 'button';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  } ${className}`;
  
  const buttonProps = Component === 'button' ? { type: 'button' as const, disabled: disabled || isLoading } : {};
  
  return (
    <Component
      {...buttonProps}
      onClick={onClick}
      className={combinedClassName}
      {...props}
    >
      {isLoading ? (
        <Throbber size={throbberSizes[size]} color={throbberColors[variant]} />
      ) : null}
      {children}
    </Component>
  );
}

export default Button;
