import { configureStore } from '@reduxjs/toolkit'
import  loginSlice  from './slices/loginDetails'
import  signupSlice from './slices/signupDetails'
import userDSlice  from './slices/userDetails'
import loadSlice from './slices/loading'
import userSlice from './slices/user'

export const store = configureStore({
  reducer: {
    "login": loginSlice,
    "signup": signupSlice,
    "userD": userDSlice,
    "loader": loadSlice,
    "user": userSlice
  },
})