import { Ref, type SVGProps, forwardRef, memo } from 'react'

const SvgUnblock = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#unblock_svg__a)'}>
      <path
        d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20'}
        fill={'currentColor'}
      />
      <path
        d={'m7.681 18.405 8.724-13.086'}
        stroke={'currentColor'}
        strokeDasharray={'6 6'}
        strokeLinecap={'round'}
        strokeWidth={2.3}
      />
    </g>
    <defs>
      <clipPath id={'unblock_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgUnblock)
const Memo = memo(ForwardRef)

export default Memo
