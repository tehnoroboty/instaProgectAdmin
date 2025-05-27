import { Ref, type SVGProps, forwardRef, memo } from 'react'

const SvgArrowSortUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={6} fill="none" {...props} ref={ref}>
    <path fill="currentColor" d="m4 0 3.464 4.5H.536z" />
  </svg>
)
const ForwardRef = forwardRef(SvgArrowSortUp)
const Memo = memo(ForwardRef)

export default Memo
