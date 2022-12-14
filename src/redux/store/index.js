import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user";
import modalReducer from "../reducer/modal";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("userState", JSON.stringify(getState().user));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("userState") !== null) {
    return { user: JSON.parse(localStorage.getItem("userState")) };
  }
};

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
});
