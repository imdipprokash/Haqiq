import React, {useState} from 'react';
import axios from 'axios';
import {useAppSelector} from '../redux/store';
import {BASE_URL} from '../constants/constants';

type Props = {endPoint: string; method?: 'get' | 'delete'};

const useGetData = ({endPoint, method}: Props) => {
  const {accessToken, refreshToken} = useAppSelector(s => s.auth);

  console.log(accessToken, refreshToken);
  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = () => {
    setLoading(true);
    let config = {
      method: 'get',
      url: `${BASE_URL}${endPoint}`,
      headers: {
        accesstoken: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        setResponse(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  };
  return {response, loading, error, getData};
};

export default useGetData;
