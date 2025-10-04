"use client";

import React, { useState, useEffect } from 'react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';

type ImageProps = NextImageProps | React.ComponentPropsWithoutRef<'img'>;

export const Image = (props: ImageProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    const { width, height, style, className } = props;
    return <div style={{ width, height, ...style }} className={className} />;
  }
  
  const isNextJsClient = typeof window !== 'undefined' && typeof window.__NEXT_DATA__ !== 'undefined';

  if (isNextJsClient) {
    return <NextImage {...(props as NextImageProps)} />;
  } else {
    const {
      priority, loading, quality, placeholder, blurDataURL,
      onLoadingComplete, loader, unoptimized,
      ...restForImg
    } = props as any;

    return <img {...restForImg} />;
  }
};

Image.displayName = 'Image';