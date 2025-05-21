import React from "react";
import clsx from "clsx";

type AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  initials = "??",
  size = "sm",
}) => {
  const sizeClass = sizeMap[size] || sizeMap["sm"];

  return (
    <div
      className={clsx(
        "flex items-center justify-center overflow-hidden rounded-full bg-slate-300 font-medium dark:bg-slate-700 dark:text-white",
        sizeClass
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
