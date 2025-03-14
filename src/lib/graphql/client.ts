import type { GraphQLResponse } from '@/lib/types/portfolio';

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  baseUrl: string
): Promise<{ data?: T; errors?: any[] }> {
  const url = `${baseUrl}/api/graphql`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
