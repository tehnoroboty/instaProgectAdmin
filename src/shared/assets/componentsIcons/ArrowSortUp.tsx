import { Ref, type SVGProps, forwardRef, memo } from 'react'

const SvgArrowSortUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={6} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props} ref={ref}>
    <path d={'m4 0 3.464 4.5H.536z'} fill={'currentColor'} />
  </svg>
)
const ForwardRef = forwardRef(SvgArrowSortUp)
const Memo = memo(ForwardRef)

export default Memo
