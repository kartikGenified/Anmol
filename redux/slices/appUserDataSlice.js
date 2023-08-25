import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId:'',
  userType:'',
  name:'',
  userData:{}
  
}

export const appUserDataSlice = createSlice({
  name: 'appusersdata',
  initialState,
  reducers: {
    
    setAppUserId: (state, action) => {
      state.userId = action.payload
    },
    setAppUserType:(state, action) =>{
        state.userType = action.payload
    },
    setAppUserName:(state, action) =>{
      state.name = action.payload
  },
    setUserData:(state, action)=>{
      state.userData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAppUserId, setAppUserType,setAppUserName,setUserData} = appUserDataSlice.actions

export default appUserDataSlice.reducer