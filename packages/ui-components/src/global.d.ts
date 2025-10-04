declare global {
  interface Window {
    __NEXT_DATA__?: {
      buildId: string;
      [key: string]: any;
    };
  }
}

export {};