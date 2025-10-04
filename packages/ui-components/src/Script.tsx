"use client";

import React, { useState, useEffect } from 'react';
import NextScript, { type ScriptProps as NextScriptProps } from 'next/script';

type ScriptProps = NextScriptProps | React.ComponentPropsWithoutRef<'script'>;

export const Script = (props: ScriptProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  const isNextJsClient = typeof window !== 'undefined' && '__NEXT_DATA__' in window;

  if (isNextJsClient) {
    return <NextScript {...(props as NextScriptProps)} />;
  } else {
    console.warn(
      `The polymorphic <Script> component is not supported in this environment (e.g., Electron/Vite) and will not render.`
    );
    return null;
  }
};

Script.displayName = 'Script';