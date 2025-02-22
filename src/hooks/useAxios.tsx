import React, {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants/constants';
import {useAppSelector} from '../redux/store';

type Props = {data: any; endPoint: string; method?: 'post' | 'put'};

const useAxios = ({data, endPoint, method}: Props) => {
  const {accessToken} = useAppSelector(s => s.auth);
  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const usePostHandler = () => {
    setLoading(true);
    let config = {
      method: method || 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}${endPoint}`,
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        setResponse(response?.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return {response, loading, error, usePostHandler};
};

export default useAxios;
