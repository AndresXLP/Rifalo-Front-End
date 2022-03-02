import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

export const RifaloAppApi = {
  async signUp(data) {
    try {
      const response = await axios.post('/signUp', data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  async getAllRaffles() {
    try {
      const response = await axios.get('/allRaffles');
      console.log(response.data);
      return response.data.raffles;
    } catch (error) {
      console.log(error.response);
    }
  },
};
