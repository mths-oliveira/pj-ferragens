import { useState } from 'react';

export function useRender() {
  const [_, setState] = useState(true);
  return () => {
    setState((state) => !state);
  };
}
