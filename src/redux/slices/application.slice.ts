import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    logginUser: (state, action) => {},
  },
});

export const { logginUser } = applicationSlice.actions;

export default applicationSlice.reducer;
