import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
const token = JSON.parse(window.localStorage.getItem('token')) || '';

const headerPost = {
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};
const headerPut = {
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

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
  async signIn(data) {
    try {
      const response = await axios.post('signIn', data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
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
  async getRaffleById(id) {
    try {
      const response = await axios.get(`/raffle/${id}`);
      console.log(response.data);
      return response.data.raffle;
    } catch (error) {
      console.log(error.response);
    }
  },
  async createRaffle({ dataFile, formValues }) {
    try {
      const urlImage = await axios.post('/upload-image', dataFile, headerPost);
      console.log(urlImage);
      formValues.image = urlImage.data;
      const response = await axios.post(
        '/create-raffle',
        formValues,
        headerPost
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateRaffleNumber(data) {
    console.log(
      `🤖 ~ file: rifaloAppApi.js ~ line 73 ~ updateRaffleNumber ~ data`,
      data
    );
    try {
      const response = await axios.put('/raffle/updateNumber', data, headerPut);
      console.log(
        `🤖 ~ file: rifaloAppApi.js ~ line 75 ~ updateRaffleNumber ~ response`,
        response
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  },
};
