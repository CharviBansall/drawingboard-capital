import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageUrl }) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-row">
      <div className="w-1/2 bg-blue-12 flex relative text-white flex-col items-center justify-center">
        <img
          src={'src/assets/WhiteLogoNoWordmark.svg'}
          alt={'DrawingBoard Logo'}
          className="h-16 aspect-auto absolute top-12 left-12"
          aria-hidden
        />
        {children}
      </div>
      <div className="w-1/2 flex items-center max-h-screen justify-center">
        <img
          src={imageUrl}
          aria-hidden
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
