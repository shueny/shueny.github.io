import type { GraphQLResponse } from '@/lib/types/portfolio';

export async function graphqlRequest<T>(
  query: string,
  variables = {},
  baseUrl?: string
): Promise<GraphQLResponse<T>> {
  const url = baseUrl
    ? new URL('/api/graphql', baseUrl).toString()
    : 'http://localhost:4321/api/graphql';

  try {
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
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(
        `GraphQL Errors: ${JSON.stringify(result.errors, null, 2)}`
      );
    }

    return result;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
