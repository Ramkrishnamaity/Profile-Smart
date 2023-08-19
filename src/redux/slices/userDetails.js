import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fName: "",
    lName: "",
    mobileN: "",
    email: "",
    address: ""
}

export const userDSlice = createSlice({
  name: 'userD',
  initialState,
  reducers: {
    setFName: (state, action)=>{
        state.fName = action.payload
    },
    setLName: (state, action)=>{
        state.lName = action.payload
    },
    setUEmail: (state, action)=>{
        state.email = action.payload
    },
    setMobileN: (state, action)=>{
        state.mobileN = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMobileN, setAddress, setFName, setLName, setUEmail} = userDSlice.actions

export default userDSlice.reducer