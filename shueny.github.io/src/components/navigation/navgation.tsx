import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { NavItems } from './constant'

const Nav = () => {
  const { t } = useTranslation(['navigation'])
  const home = NavItems.LINKS[0]
  const nav = NavItems.LINKS.slice(1)
  const logo = NavItems.LOGO

  console.log('nav:', nav)
  return (
    <div className="w-full fixed top-0 bg-transparent mx-auto">
      <nav className="w-[90vw] flex flex-nowrap justify-between mx-auto h-10 items-center py-2">
        <Link href={home.url} passHref>
          <a className="h-full w-auto flex flex-1">
            <img src={logo.img} alt={t(logo.alt)} />
          </a>
        </Link>

        <ul className="w-fit flex gap-3">
          {nav.map(({ name, url }, index: number) => {
            return (
              <li key={`${index}-item`} className="">
                <Link href={url}>
                  <a className="text-white-emphasis">{t(name)}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
