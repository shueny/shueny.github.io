import { createYoga } from 'graphql-yoga';
import { schema } from '@/lib/graphql/schema';
import type { APIContext } from 'astro';

const yoga = createYoga({
  schema,
  graphiql: true, // 開發環境可以使用 GraphiQL 介面
  landingPage: false,
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
});

export async function GET(context: APIContext) {
  return yoga.fetch(context.request);
}

export async function POST(context: APIContext) {
  return yoga.fetch(context.request);
}
