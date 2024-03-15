import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {},
  reducers: {
    createEventReducer(state, action) {
      return { ...state, ...action.payload };
    },
    clearnReducer(state, action) {
      return {};
    },
  },
});

// Extract the action creators object and the reducer
export const { createEventReducer, clearnReducer } = eventSlice.actions;
const _eventReducer = eventSlice.reducer;
// Export the reducer, either as a default or named export
export default _eventReducer;