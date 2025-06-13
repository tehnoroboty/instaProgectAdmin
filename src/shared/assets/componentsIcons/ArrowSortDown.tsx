import { Ref, type SVGProps, forwardRef, memo } from 'react'

const SvgArrowSortDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={6} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props} ref={ref}>
    <path d={'M4 5 .536.5h6.928z'} fill={'currentColor'} />
  </svg>
)

const ForwardRef = forwardRef(SvgArrowSortDown)
const Memo = memo(ForwardRef)

export default Memo
