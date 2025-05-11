import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl: string;
  altText?: string;
  logoUrl?: string;
  logoAltText?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  imageUrl,
  altText = 'Decorative image',
  logoUrl = "https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets/svg/WhiteLogoNoWordmark.svg",
  logoAltText = "Brand Logo",
}) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-row">
      <div className="w-1/2 bg-blue-12 flex relative text-white flex-col items-center justify-center">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={logoAltText}
            className="h-16 aspect-auto absolute top-12 left-12"
          />
        )}
        {children}
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
