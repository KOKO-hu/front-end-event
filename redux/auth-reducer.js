import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    infoUserReducer(state, action) {
     return { ...state, ...action.payload }
      
      },

  }
})

export const { infoUserReducer } = AuthSlice.actions
const authReducer= AuthSlice.reducer
export default authReducer;