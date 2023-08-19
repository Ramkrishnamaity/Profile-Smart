import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    password: ""
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setEmail: (state, action)=>{
        state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail, setPassword } = signupSlice.actions

export default signupSlice.reducer