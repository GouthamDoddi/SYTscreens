import Axios from 'axios';


export const axios = Axios.create({
  baseURL: 'http://sut.basservices.in',
});

export const config = {

  mode: 'cors',
  crossDomain: true,
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
};

export function configToken (token) {
  return { mode: 'cors',
    crossDomain: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${token}`,
    } };
}

export const localAxiosToken = (url, data, token) => {
  console.log('local axios called!');

  return {
    method: 'post',
    url: `https://syt-backend.herokuapp.com${url}`,
    // url: `http://localhost:3000${url}`,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
    data,
  };
};

export const localAxios = (url, data) => ({
  method: 'post',
  url: `https://syt-backend.herokuapp.com${url}`,
  // url: `http://localhost:3000${url}`,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data,
});

export const localAxiosFormData = (url, data, token) => ({
  method: 'post',
  url: `https://syt-backend.herokuapp.com${url}`,
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'multipart/form-data',
  },
  data,
});
