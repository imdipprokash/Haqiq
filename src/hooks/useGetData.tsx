import React, {useState} from 'react';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {BASE_URL} from '../constants/constants';
import {ADD_AUTH, REMOVE_AUTH} from '../redux/slices/authInfo';

type Props = {endPoint: string; method?: 'get' | 'delete'};

const useGetData = ({endPoint, method}: Props) => {
  const {accessToken, refreshToken, countryCode, languageCode} = useAppSelector(
    s => s.auth,
  );
  const dispatch = useAppDispatch();
  // console.log(endPoint, accessToken);
  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = () => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}${endPoint}`,
      headers: {
        accesstoken: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        setResponse(response?.data);
        setLoading(false);
      })
      .catch((error: any) => {
        if (error?.response?.status === 401) {
          UpdateAccessToken();
        } else {
          setError(error);
          setLoading(false);
        }
      });
  };

  const UpdateAccessToken = () => {
    let config = {
      method: method || 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/auth/device/token/refresh`,
      headers: {
        accesstoken: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        refresh_token: refreshToken,
      },
    };
    axios
      .request(config)
      .then(response => {
        const authRes = response?.data;
        dispatch(
          ADD_AUTH({
            accessToken: authRes.access_token,
            refreshToken: authRes?.refresh_token,
            countryCode: countryCode || 'SA',
            languageCode: languageCode || 'ar',
            deviceId: '',
          }),
        );
        getData();
      })
      .catch(error => {
        dispatch(REMOVE_AUTH());
        setError(error);
      });
  };
  return {response, loading, error, getData};
};

export default useGetData;
