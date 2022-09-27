import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    content: null,
  },
  reducers: {
    openModal: (state, actions) => {
      state.isOpen = true;
      state.content = actions.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;
