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
