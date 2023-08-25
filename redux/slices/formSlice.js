import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  warrantyForm:{}
  
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    
    
    setWarrantyForm: (state, action) => {
        state.warrantyForm = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setWarrantyForm} = formSlice.actions

export default formSlice.reducer