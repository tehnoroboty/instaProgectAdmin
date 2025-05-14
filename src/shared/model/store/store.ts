import { type TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'

import { appReducer, appSlice } from '@/src/shared/model/slices/appSlice'
import { authReducer, authSlice } from '@/src/shared/model/slices/authSlice'
import { modalReducer, modalSlice } from '@/src/shared/model/slices/modalSlice'
import { postsReducer, postsSlice } from '@/src/shared/model/slices/postsSlice'
import { configureStore } from '@reduxjs/toolkit'

export const initializeStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    reducer: {
      [appSlice.name]: appReducer,
      [authSlice.name]: authReducer,
      [modalSlice.name]: modalReducer,
      [postsSlice.name]: postsReducer,
    },
  })
}

type StoreType = ReturnType<typeof initializeStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<StoreType>()
