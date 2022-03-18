import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

let token = JSON.parse(window.localStorage.getItem('token')) || null;

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

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  async signIn(data) {
    try {
      const response = await axios.post('signIn', data);
      headerGet.headers.authorization = `Bearer ${response.data.token}`;
      headerPost.headers.authorization = `Bearer ${response.data.token}`;
      headerPut.headers.authorization = `Bearer ${response.data.token}`;
      headerDelete.headers.authorization = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  async getAllRaffles() {
    try {
      const response = await axios.get('/allRaffles');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  async getMyRaffle() {
    try {
      const response = await axios.get('/raffle/createdBy', headerGet);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  async getRaffleById(id) {
    try {
      const response = await axios.get(`/raffle/${id}`);
      return response.data;
    } catch (error) {
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
      return error.response.data;
    }
  },
  async updateRaffleNumber(data) {
    data.selected = true;
    try {
      const response = await axios.put('/raffle/updateNumber', data, headerPut);
      return response.data;
    } catch (error) {}
  },
  async deleteRaffle(id) {
    try {
      const response = await axios.delete(`/raffle/delete/${id}`, headerDelete);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};
