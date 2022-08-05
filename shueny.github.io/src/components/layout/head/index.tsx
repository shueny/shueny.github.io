import Head from 'next/head'
import { useTranslation } from 'next-i18next'

const HeadComponent = () => {
  const { t } = useTranslation(['about'])
  return (
    <Head>
      <title>{`${t('en_name')} ${t('last_name')}`}</title>
      <meta name="description" content={t('description')} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default HeadComponent
