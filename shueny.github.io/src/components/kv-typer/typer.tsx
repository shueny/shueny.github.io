import { useTranslation, withTranslation } from 'next-i18next'
import dataJson from '../../json/data.json'
import { IKVTyperProps } from './type'

const KVTyper = ({ data }: any) => {
  const { t, i18n } = useTranslation(['typer'])
  console.log(t('description_1'))

  return (
    <div id="kvTyper" className={`kv kv-typer bg-${data.imgPicBg}`}>
      <div className="page-table">
        <div className="table-cell text-center">
          <div className="container">
            <h1 className="title">{t('title')}</h1>
            <h2 className="typer-title"></h2>
            <a href="#about" className="scroll home-s-btn hor-center">
              <span className="dot center"></span>
            </a>
          </div>
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
