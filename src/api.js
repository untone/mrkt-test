import axios from 'axios';

const endpoints = {
  signin: 'http://mrkt.little.team/api/public/users/login',
  password: 'http://mrkt.little.team/api/public/users/reset-password'
};

const Api = ({name, data}) => {
  return axios.post(endpoints[name], data)
    .then(response => {
      return response.data
    })
    .catch((error) => {
      throw error
    });
};

export default Api;
