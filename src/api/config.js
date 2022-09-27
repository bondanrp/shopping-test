const { default: axios } = require("axios");
const { default: store } = require("../redux/store");
const serverUrl = "https://fe.dev.dxtr.asia/api";

const securedApi = axios.create({
  baseURL: `${serverUrl}`,
});

securedApi.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
