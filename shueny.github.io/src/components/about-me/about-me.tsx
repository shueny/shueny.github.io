import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import the icons you need
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { IAboutProps } from './type'

const AboutSection = ({ first_name, last_name, en_name }: IAboutProps) => {
  return (
    <section className="mx-auto mb-10 w-full max-w-[90vw] pt-20 lg:max-w-[960px] xl:max-w-[1176px]">
      <div className="aboutMe pt-5">
        <div className="header mb-2">
          <p className="line line-grey">
            <span className="subTitle col-md-4">The Resume of</span>
          </p>
          <h1 className="title">
            <span>{`${last_name}${first_name}`}</span>
            <b className="dot">
              <FontAwesomeIcon
                icon={faCircle}
                style={{ fontSize: 100, color: 'blue' }}
              />
            </b>
            <span className="ml-1">{en_name}</span>
          </h1>
          <p className="line line-grey"></p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
