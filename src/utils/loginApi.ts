import {HttpStatus, fetchAPI} from './fetchApi';
import {URLS} from './urls';

const loginApi = async (email: string, password: string) => {
  try {
    const {data, status} = await fetchAPI({
      endpoint: URLS.loginAPi(email, password),
      method: 'GET',
    });
    console.log('api call');
    if (status === HttpStatus.OK) {
      console.log('login success==>', data);
      return {data, status};
    } else {
      console.log('login error', status, data);
    }
  } catch (error) {
    console.log('login error==>', error);
  }
};

export {loginApi};
