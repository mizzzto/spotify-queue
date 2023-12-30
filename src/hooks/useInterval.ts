import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (callbackRef.current) callbackRef.current();
    };
    const id = setInterval(tick, delay);
    return () => {
      clearInterval(id);
    };
  });
};
