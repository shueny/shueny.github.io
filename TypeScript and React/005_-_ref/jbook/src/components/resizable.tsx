import { ResizableBox } from 'react-resizable'
import './resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical' // 一般來說用 string，但若有明確的可以直接把 type 寫上
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox width={300} height={300} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  )
}

export default Resizable
