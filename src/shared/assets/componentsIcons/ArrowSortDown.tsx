import { Ref, type SVGProps, forwardRef, memo } from 'react'

const SvgArrowSortDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={8} height={6} fill="none" {...props} ref={ref}>
    <path fill="currentColor" d="M4 5 .536.5h6.928z"/>
</svg>
);

const ForwardRef = forwardRef(SvgArrowSortDown)
const Memo = memo(ForwardRef)

export default Memo