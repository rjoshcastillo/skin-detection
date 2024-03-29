import axios from "axios";

const BASE_URL = "http://192.168.0.100:5000/api";

const DiseaseServices = {
  getDiseases: async () => {
    const response = await axios.get(`${BASE_URL}/get-diseases`);
    return response.data;
  },

  getDiseaseByName: async (name) => {
    const response = await axios.get(`${BASE_URL}/get-disease?name=${name}`);
    return response.data;
  },
};

export default DiseaseServices;
