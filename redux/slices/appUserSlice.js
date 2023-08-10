import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  manualApproval : [],
  autoApproval : []
}

export const appUserSlice = createSlice({
  name: 'appusers',
  initialState,
  reducers: {
    
    setAppUsers: (state, action) => {
      state.value = action.payload
    },
    deleteAppUsers:(state, action) =>{
        state.value = []
    },
    setManualApproval:(state,action) =>{
      state.manualApproval = action.payload
    },
    setAutoApproval : (state,action) =>{
      state.autoApproval = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAppUsers, deleteAppUsers,setManualApproval,setAutoApproval} = appUserSlice.actions

export default appUserSlice.reducer