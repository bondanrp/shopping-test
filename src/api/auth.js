import { publicApi } from "./config";

const authControllers = {
  login: async (body) => {
    try {
      let result = await publicApi.post(`/login`, body);
      return result;
    } catch (error) {
      throw error;
    }
  },
  register: async (body) => {
    try {
      let result = await publicApi.post(`/register`, body);
      return result;
    } catch (error) {
      throw error;
    }
  },

  logout: async (params) => {
    try {
      let result = await publicApi.get("/logout", { params });
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default authControllers;
