import { useState, useEffect } from 'react';
import type React from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsyncState<T>(
  asyncFunction: () => Promise<T> | T,
  dependencies: React.DependencyList = []
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const executeAsync = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await asyncFunction();
        
        if (isMounted) {
          setState({
            data: result,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    };

    executeAsync();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}