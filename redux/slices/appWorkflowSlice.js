import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  program:[],
  workflow:''
  
}

export const appWorkflowSlice = createSlice({
  name: 'appWorkflow',
  initialState,
  reducers: {
    
    setProgram: (state, action) => {
      state.program = action.payload
    },
    setWorkflow: (state, action) => {
        state.workflow = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setProgram,setWorkflow} = appWorkflowSlice.actions

export default appWorkflowSlice.reducer