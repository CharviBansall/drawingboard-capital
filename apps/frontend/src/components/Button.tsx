import { BeatLoader } from 'react-spinners';
import React from 'react';

type ButtonProps = {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
};

export default function Button({
  isLoading,
  disabled,
  onClick,
  children = 'Continue',
  className = '',
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-white text-blue-12 font-medium p-2 rounded-md transition-all
        hover:bg-slate-200 disabled:bg-slate-400 disabled:text-slate-700 disabled:cursor-not-allowed
        cursor-pointer ${className}`}
    >
      {isLoading ? (
        <BeatLoader className="text-blue-12" size={7} speedMultiplier={0.5} />
      ) : (
        children
      )}
    </button>
  );
}
