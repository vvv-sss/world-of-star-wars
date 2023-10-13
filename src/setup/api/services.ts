import axios from 'axios';
import {GetRequestPayload} from '../../types';

export const getRequest = async <T>(payload: GetRequestPayload) => {
  try {
    const {url, configs} = payload;

    const response = await axios.get<T>(url, configs);

    return response;
  } catch (error) {
    const {errorMessage} = payload;

    if (axios.isAxiosError(error)) {
      return {error: error.message};
    } else {
      return {error: errorMessage ?? 'Something went wrong...'};
    }
  }
};
