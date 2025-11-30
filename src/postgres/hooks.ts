
import { useState, useEffect } from 'react';

export function useQuery<T>(query: string, params: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, params }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, isLoading, error };
}

export function useCollection<T>(table: string) {
  const query = `SELECT * FROM "${table}"`;
  return useQuery<T[]>(query);
}

export function useDoc<T>(table: string, id: string) {
  const query = `SELECT * FROM "${table}" WHERE id = $1`;
  const { data, ...rest } = useQuery<T[]>(query, [id]);
  return { data: data?.[0] || null, ...rest };
}

