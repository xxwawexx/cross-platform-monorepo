'use client';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function ThemeRegistry(props: { options?: any; children: React.ReactNode }) {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'mui-style', ...options });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let html = '';
    for (const name of names) {
      html += `<style data-emotion="${cache.key} ${name}">${cache.inserted[name]}</style>`;
    }
    
    return (
      <React.Fragment>
        <style
          key={cache.key}
          data-emotion={`${cache.key} ${names.join(' ')}`}
          dangerouslySetInnerHTML={{
            __html: Object.values(cache.inserted).join(' '),
          }}
        />
      </React.Fragment>
    );
  });

  return (
    <EmotionCacheProvider value={cache}>
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </EmotionCacheProvider>
  );
}