import axios from 'axios';

axios.defaults.baseURL = 'https://rifalo-app.herokuapp.com/';

let token = JSON.parse(window.localStorage.getItem('token')) || null;
console.log(`🤖 ~ file: rifaloAppApi.js ~ line 6 ~ token`, token);

const headerGet = {
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};
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
const headerDelete = {
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
      headerGet.headers.authorization = `Bearer ${response.data.token}`;
      headerPost.headers.authorization = `Bearer ${response.data.token}`;
      headerPut.headers.authorization = `Bearer ${response.data.token}`;
      headerDelete.headers.authorization = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  async getAllRaffles() {
    try {
      const response = await axios.get('/allRaffles');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
  async getMyRaffle() {
    try {
      const response = await axios.get('/raffle/createdBy', headerGet);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
  async getRaffleById(id) {
    try {
      const response = await axios.get(`/raffle/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  },
  async createRaffle({ dataFile, formValues }) {
    try {
      const image = await axios.post('/upload-image', dataFile, headerPost);
      formValues.image = image.data;
      const response = await axios.post(
        '/create-raffle',
        formValues,
        headerPost
      );
      return response.data._id;
    } catch (error) {
      console.log(error);
    }
  },
  async updateRaffleNumber(data) {
    data.selected = true;
    try {
      const response = await axios.put('/raffle/updateNumber', data, headerPut);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  },
  async deleteRaffle(id) {
    try {
      const response = await axios.delete(`/raffle/delete/${id}`, headerDelete);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  },
};
