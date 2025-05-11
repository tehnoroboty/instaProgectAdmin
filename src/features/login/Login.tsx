'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormType, schema } from '@/src/features/login/validators'
import { useLoginAdminMutation } from '@/src/queries/login/loginAdmin.generated'
import { LoginError } from '@/src/shared/model/api/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Card } from '@/src/shared/ui/card/Card'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import s from './login.module.scss'

export default function Login() {
  const [adminLogin, { loading }] = useLoginAdminMutation()
  const router = useRouter()

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<FormType>({
    defaultValues: {
      email: 'admin@gmail.com',
      password: 'admin',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const disabledButton = loading || !isValid || Object.keys(errors).length > 0

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const { data } = await adminLogin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      })

      if (data?.loginAdmin.logged) {
        const credentials = btoa(`${formData.email}:${formData.password}`)

        localStorage.setItem('authorization', credentials)
        router.push('/users-list')
      }
    } catch (err) {
      const { data } = err as LoginError

      setError('password', { message: data.messages, type: 'manual' })
    }
  }

  return (
    <>
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          {'Sign In'}
          <br />
          e-mail: admin@gmail.com
          <br />
          pass: admin
        </Typography>
        <form className={s.boxInputs} onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={s.input}
            label={'Email'}
            placeholder={'Epam@epam.com'}
            {...register('email')}
            error={errors.email && errors.email.message}
          />
          <Input
            className={s.input}
            label={'Password'}
            placeholder={'**********'}
            type={'password'}
            {...register('password')}
            error={errors.password && errors.password.message}
          />
          <Button
            className={s.signIn}
            disabled={disabledButton}
            fullWidth
            type={'submit'}
            variant={'primary'}
          >
            {'Sign in'}
          </Button>
        </form>
      </Card>
    </>
  )
}
