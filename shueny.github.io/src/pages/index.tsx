import type { NextPage } from 'next'
import Head from 'next/head'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as Layouts from '../components/layout'
import dataJson from '../json/data.json'
import { KVTyper } from '../components/kv-typer'

import { useRouter } from 'next/router'
import { Nav } from '../components/navigation'

const Home: NextPage = (props) => {
  const { data } = props
  console.log(useRouter())
  console.log(props)

  const router = useRouter()
  const { t } = useTranslation(['common', 'typer'])

  console.log('useTranslation')
  console.log(useTranslation())
  console.log(data)

  return (
    <div>
      <Layouts.Head />

      <main className="">
        <div>
          <Nav />
          <KVTyper data={data['typer']} />
        </div>
      </main>

      <Layouts.Footer />
    </div>
  )
}

export default Home

// const getStaticProps = makeStaticProps(['common'])
const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'about',
      'typer',
      'navigation',
    ])),
    data: dataJson,
    fallback: false,
  },
})

export { getStaticProps }
