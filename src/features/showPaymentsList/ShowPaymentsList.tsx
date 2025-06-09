'use client'

import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'
import { Input } from '@/src/shared/ui/input'

import s from '@/src/features/showPaymentsList/showPaymentsList.module.scss'

export const ShowPaymentsList = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <CheckBox className={s.autoUpdate} label={'Autoubdate'} />
        <Input
          className={s.searchInput}
          onInput={() => {}}
          placeholder={'Search'}
          type={'search'}
        />
      </div>
    </div>
  )
}
