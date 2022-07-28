import { IMouseLinkProps } from './type'

const Dot = () => {
  return (
    <div className="w-7 h-10 border border-white-emphasis rounded-2xl flex justify-center p-1 relative">
      <span className="animate-mouse-dot w-1 h-1 bg-white-emphasis rounded absolute" />
    </div>
  )
}

const MouseLinkComponent = ({ link }: IMouseLinkProps) => {
  return !link ? (
    <Dot />
  ) : (
    <a href={link} className="relative">
      <Dot />
    </a>
  )
}

export default MouseLinkComponent
