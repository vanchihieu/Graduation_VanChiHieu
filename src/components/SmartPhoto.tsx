import React, { useEffect, useState } from 'react';

interface SmartPhotoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback: string;
  alt: string;
}

export const SmartPhoto: React.FC<SmartPhotoProps> = ({ src, fallback, alt, className, ...rest }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [usedFallback, setUsedFallback] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src);
    setUsedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!usedFallback && imgSrc !== fallback) {
      setUsedFallback(true);
      setImgSrc(fallback);
    }
  };

  return <img src={imgSrc} alt={alt} onError={handleError} className={className} {...rest} />;
};
