// import { FormType } from '@/src/features/login/validators'
// import { baseApi } from '@/src/shared/model/api/baseApi'
//
// import { setAppError, setUserId } from '../slices/appSlice'
// import {
//   ArgsPostGoogleOAuth,
//   CreateNewPasswordRecoveryType,
//   MeResponse,
//   OAuthTokenResponse,
//   PasswordRecoveryType,
//   RecoveryCodeResponse,
//   RecoveryCodeType,
//   RegistrationEmailResending,
//   RegistrationType,
// } from './types'
//
// export const authApi = baseApi.injectEndpoints({
//   endpoints: builder => ({
//     login: builder.mutation<{ accessToken: string }, FormType>({
//       async onQueryStarted(_args, { queryFulfilled }) {
//         const response = await queryFulfilled
//
//         localStorage.setItem('accessToken', response.data.accessToken)
//       },
//       query: body => ({
//         body,
//         method: 'POST',
//         url: 'auth/login',
//       }),
//     }),
//     logout: builder.mutation<void, void>({
//       async onQueryStarted(_args, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled
//           dispatch(baseApi.util.resetApiState())
//           localStorage.removeItem('accessToken')
//         } catch (error) {
//           console.error('Ошибка при разлогине:', error)
//         }
//       },
//       query: () => ({
//         method: 'POST',
//         url: 'auth/logout',
//       }),
//     }),
//     me: builder.query<MeResponse, void>({
//       async onQueryStarted(_args, { dispatch, queryFulfilled }) {
//         try {
//           const res = await queryFulfilled
//
//           dispatch(setUserId({ userId: res.data.userId }))
//         } catch (error) {
//           console.error('Ошибка ME запроса:', error)
//         }
//       },
//       query: () => 'auth/me',
//     }),
//   }),
// })
//
// export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
