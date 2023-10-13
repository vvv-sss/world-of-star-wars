import {AxiosRequestConfig} from 'axios';
import {People} from './data';

type GetRequestPayload = {
  url: string;
  configs?: AxiosRequestConfig<any>;
  errorMessage?: string;
};

type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: People[];
};

export type {GetRequestPayload, PeopleResponse};
