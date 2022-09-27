import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  token: "",
  email: "",
  isAuthenticated: false,
};
export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, actions) => {
            return (state = actions.payload);
        },
        logout: (state) => {
            return (state = initialState);
        }
    }
});

export const { login, logout } = user.actions;

export default user.reducer;
