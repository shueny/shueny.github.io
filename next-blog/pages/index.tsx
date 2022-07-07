import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { BlogPost } from '../src/@types/schema'
import NotionService from '../src/services/notion-service'

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService()
  const posts = await notionService.getPublishedBlogPosts()

  return {
    props: {
      posts,
    },
  }
}

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'Test Blog'
  const description = 'Welcome to my Notion Blog.'
  console.log('post:', posts)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
        <meta name={'og:title'} title={'og:title'} content={title} />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={title}
        />
      </Head>

      <div className="min-h-screen">
        <main className="max-w-5xl mx-auto relative">
          <div className="h-full pt-4 pb-16 px-4 md:px-0 mx-auto">
            <div className="flex items-center justify-center">
              <h1 className="font-extrabold text-xl md:text-4xl text-black text-center">
                Notion + NextJS Sample Blog
              </h1>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
              {posts.map((post: BlogPost) => (
                <p key={post.id}>Blog Post Component Here: {post.title}</p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
