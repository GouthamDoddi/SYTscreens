import Axios from 'axios';
import qs from 'querystring';


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

export const localAxiosToken = (url, data, token) => ({
  method: 'post',
  url: `http://localhost:3000${url}`,
  headers: {
    Accept: '*/*',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data,
});

export const localAxios = (url, data) => ({
  method: 'post',
  url: `http://localhost:3000${url}`,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: qs.stringify(data),
});
