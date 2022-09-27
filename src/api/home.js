import { securedApi } from "./config";

let homeControllers = {
  getProducts: async (body) => {
    try {
      let result = await securedApi.get(`/products`, body);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default homeControllers;
