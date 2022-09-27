const { default: axios } = require("axios");
const { default: store } = require("../redux/store");
const { logout } = require("../redux/reducer/user");

const serverUrl = process.env.REACT_APP_API_BASE_URL;
const { toast } = require("react-toastify");

const securedApi = axios.create({
  baseURL: `${serverUrl}`,
});

securedApi.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

securedApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (expiredToken(error)) {
      store.dispatch(logout());
      toast.error("User session has expired!", { toastId: "expired-sesh" });
    }
    throw error;
  }
);
const publicApi = axios.create({
  baseURL: `${serverUrl}`,
});

const expiredToken = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      return true;
    }
  } else {
    return false;
  }
};

module.exports = { publicApi, securedApi, expiredToken };
