import { useTranslation, withTranslation } from 'next-i18next'
import { useMemo } from 'react'
import Typewriter from 'typewriter-effect'
import dataJson from '../../json/data.json'
import { MouseLink } from '../mouse'
import { IKVTyperProps } from './type'

const KVTyper = ({ data }: any) => {
  const { t, i18n } = useTranslation(['typer'])
  const description_sentence = useMemo(() => {
    return data.description.map((text: string) => t(text))
  }, [data.description, t])

  return (
    <div
      id="kvTyper"
      className="w-full h-screen kv-typer bg-cover-typer bg-cover text-white-emphasis"
    >
      <div className="h-full w-full flex flex-wrap items-center justify-center">
        <div className="container w-full h-fit text-center flex justify-center flex-wrap items-center">
          <h1 className="w-full title text-4xl font-bold tracking-wider">
            {t('title')}
          </h1>
          <h2 className="w-full typer-title text-white-secondary text-2xl">
            <Typewriter
              options={{
                strings: description_sentence,
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
        </div>
        <div className="w-full flex justify-center absolute bottom-10">
          <MouseLink link="#about" />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: { data: dataJson },
  }
}
export default KVTyper
