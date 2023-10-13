import {AxiosRequestConfig} from 'axios';

type GetRequestPayload = {
  url: string;
  configs?: AxiosRequestConfig<any>;
  errorMessage?: string;
};

export type {GetRequestPayload};
