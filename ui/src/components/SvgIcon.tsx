import React from "react";

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
}

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  ...rest
}): React.ReactNode | null => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/${name}.svg`}
      {...rest}
    />
  );
};
