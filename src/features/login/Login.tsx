'use client'

import type { LoginError } from '@/src/shared/types/types'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormType, schema } from '@/src/features/login/validators'
import { useLoginAdminMutation } from '@/src/queries/login/loginAdmin.generated'
import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { clearAuth, setAuth } from '@/src/shared/model/slices/authSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Input, Typography } from '@tehnoroboty/ui-kit'
import { useRouter } from 'next/navigation'

import s from './login.module.scss'

export default function Login() {
  const [adminLogin, { loading }] = useLoginAdminMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()
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

        dispatch(setAuth({ isAuth: true }))
        router.push(AppRoutes.USERS_LIST)
      }
    } catch (err) {
      dispatch(clearAuth())
      const { data } = err as LoginError

      setError('password', { message: data.messages, type: 'manual' })
    }
  }

  return (
    <>
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          {'Sign In'}
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
