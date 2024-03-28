import { createSlice } from "@reduxjs/toolkit";

const favorieSlice = createSlice({
  name: "favorie",
  initialState: {
    favorie:{}
  },
  reducers: {
    createfavorieReducer(state, action) {
      return { ...state, ...action.payload };
    },
    clearnReducer(state, action) {
      return {};
    },
    favorieItemReducer(state, action) { 
        state.favorie = action.payload;
    }
  },
});

// Extract the action creators object and the reducer
export const { createfavorieReducer, clearnReducer,favorieItemReducer } = favorieSlice.actions;
const _favorieReducer = favorieSlice.reducer;
// Export the reducer, either as a default or named export
export default _favorieReducer;