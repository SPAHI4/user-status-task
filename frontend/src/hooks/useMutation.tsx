import { useCallback, useState } from 'react';

export const useMutation = <TResponse, TBody extends Record<string, unknown>>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
): {
  loading: boolean;
  mutate: (body: TBody) => Promise<TResponse>;
  data: TResponse | null;
  error: Error | null;
} => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (body: TBody) => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = (await response.json()) as TResponse;
        setData(result);
        setLoading(false);
        return result;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [method, url],
  );

  return {
    loading,
    mutate,
    data,
    error,
  };
};
