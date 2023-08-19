import { createSlice } from '@reduxjs/toolkit'
import avatar from '../../assets/profile.png'

const initialState = {
    avatar: avatar
}

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAvatar } = avatarSlice.actions

export default avatarSlice.reducer