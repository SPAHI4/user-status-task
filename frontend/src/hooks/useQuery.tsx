import { use, useCallback, useMemo, useState } from 'react';

// Simple hook to fetch data from an API
// It doesn't use AbortController, so there could be issues with fast typing as Chrome throttles fetch requests

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQuery = <TResponse, TQuerystring extends Record<string, any> | undefined = undefined>(
  url: string,
  query?: TQuerystring,
): [data: TResponse, refetch: () => void] => {
  const [key, setKey] = useState(0);

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    // filter out falsy values
    if (value) {
      params.append(key, value as string);
    }
  }
  const queryString = params.toString();

  const promise = useMemo(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${url}?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    return (await res.json()) as TResponse;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, queryString, key]);

  const refetch = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  // errors are handled by error boundary
  const data = use(promise);

  return [data, refetch];
};
