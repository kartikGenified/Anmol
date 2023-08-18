import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId:'',
  userType:''
  
}

export const appUserDataSlice = createSlice({
  name: 'appusers',
  initialState,
  reducers: {
    
    setAppUserId: (state, action) => {
      state.value = action.payload
    },
    setAppUserType:(state, action) =>{
        state.value = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setAppUserId, setAppUserType} = appUserDataSlice.actions

export default appUserDataSlice.reducer