import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useMemo } from 'react';

import { config } from '../config';

import { HttpStatus } from '../constants';
import { useAuthContext } from '../contexts/AuthContext';

export const useAxios = () => {
  const { auth, attemptRefresh } = useAuthContext();
  const axiosInstance = useMemo(() => {
    const instance = axios.create({ baseURL: config.SPOTIFY_API_URL });
    instance.defaults.headers.common['Accept'] =
      'application/json, application/x-www-form-urlencoded';
    instance.interceptors.request.use((req: AxiosRequestConfig) => {
      if (auth.accessToken) {
        req.headers!['Content-Type'] = 'application/json';
        req.headers!['Authorization'] = `Bearer ${auth.accessToken}`;
      }
      return req;
    });

    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log(res.statusText);
        return res;
      },
      (error) => {
        console.error(JSON.stringify(error));
        if (
          [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].includes(
            error.response?.status
          )
        ) {
          attemptRefresh();
        }
      }
    );
    return instance;
  }, [auth.accessToken]);
  return axiosInstance;
};
