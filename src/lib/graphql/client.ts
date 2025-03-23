import type { GraphQLResponse } from '@/lib/types/portfolio';
import { portfolioData } from '@/lib/data/portfolio'; // 用於靜態資料的回退

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  baseUrl: string,
  options = { useStaticFallback: false }
): Promise<{ data?: T; errors?: any[] }> {
  try {
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
  } catch (error) {
    console.error('GraphQL request failed:', error);

    // 如果啟用了靜態回退選項且查詢與 portfolio 相關
    if (options.useStaticFallback && query.includes('portfolio')) {
      console.log('Using static fallback data');
      return { data: { portfolio: portfolioData } as unknown as T };
    }

    throw error;
  }
}
