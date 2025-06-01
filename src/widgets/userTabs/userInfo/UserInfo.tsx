import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './userInfo.module.scss'

type Props = {
  userId: string
}

export const UserInfo = ({ userId }: Props) => {
  // здесь GraphQL или RTK-запрос на получение инфы
  // пример:
  // const { data, loading } = useGetUserByIdQuery({ id: userId })

  return (
    <div>
      <div className={s.top}>
        <AvatarBox size={'m'} />
        <div>
          <Typography as={'h1'} option={'h1'}>
            Ivan Yakimenko
          </Typography>
          <Typography as={'a'} className={s.link} href={'#'} option={'small_link'}>
            Ivan.sr.yakimenko
          </Typography>
        </div>
      </div>
      <div className={s.extraData}>
        <div className={s.box}>
          <Typography className={s.title} option={'regular_text14'}>
            UserID
          </Typography>
          <Typography as={'h1'} option={'regular_text16'}>
            21331QErQe21
          </Typography>
        </div>
        <div className={s.box}>
          <Typography className={s.title} option={'regular_text14'}>
            Profile Creation Date
          </Typography>
          <Typography as={'h1'} option={'regular_text16'}>
            12.12.2022
          </Typography>
        </div>
      </div>
    </div>
  )
}
