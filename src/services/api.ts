import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/tractian/fake-api',
});

export default Api;
