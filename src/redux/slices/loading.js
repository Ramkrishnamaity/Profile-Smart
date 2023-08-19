import { createSlice } from '@reduxjs/toolkit'


export const loadSlice = createSlice({
  name: 'loader',
  initialState: {value: false},
  reducers: {
    setValue: (state, action)=>{
        state.value = action.payload 
    }
  },
})

// Action creators are generated for each case reducer function
export const { setValue } = loadSlice.actions

export default loadSlice.reducer