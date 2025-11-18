import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AuthState = {
  authChecked: boolean
  isAuth: boolean
}

const initialState: AuthState = {
  authChecked: false, // Для отслеживания завершения проверки
  isAuth: false,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearAuth: state => {
      state.isAuth = false
      state.authChecked = false
    },
    setAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.authChecked = true
      state.isAuth = action.payload.isAuth
    },
  },
})

export const { clearAuth, setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
