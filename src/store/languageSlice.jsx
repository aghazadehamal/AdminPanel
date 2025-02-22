import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languageId: localStorage.getItem("languageId") ? Number(localStorage.getItem("languageId")) : 1,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.languageId = action.payload;
      localStorage.setItem("languageId", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
