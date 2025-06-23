// @flow
import * as React from 'react'

import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { SelectLanguage, Typography } from '@tehnoroboty/ui-kit'
import Link from 'next/link'

import s from './headerWeb.module.scss'

type Props = {
  title: string
}

export const HeaderWeb = (props: Props) => {
  const { title } = props

  return (
    <div className={s.container}>
      <Link href={AppRoutes.HOME} style={{ alignItems: 'flex-end', display: 'flex' }}>
        <Typography as={'h1'} option={'Large'}>
          {title}
        </Typography>
        <div style={{ transform: 'translateY(-4px)' }}>
          <Typography as={'span'} option={'small_text'} size={'s'}>
            {'Super'}
          </Typography>
          <Typography as={'span'} option={'semi-bold_small_text'} size={'s'} weight={'bold'}>
            {'Admin'}
          </Typography>
        </div>
      </Link>
      <div className={s.headerActions}>
        <SelectLanguage />
      </div>
    </div>
  )
}
