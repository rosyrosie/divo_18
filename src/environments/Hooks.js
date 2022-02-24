import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url, body, fetchType, dependency = []) => {
  const [ payload, setPayload ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const token = localStorage.getItem('token');
  const tokenHeader = {headers: {"Authorization": `Token ${token}`}};

  let fetcher = () => {};
  switch(fetchType){
    case 'POST':
      fetcher = (url, body) => axios.post(url, body, tokenHeader);
      break;
    
    case 'GET':
      // fetcher = (url, body) => axios.get(url, tokenHeader);
      fetcher = (url, body) => axios.get(url);
      break;
    
    default:
      break;
  }

  useEffect(() => {
    if(!token){
      console.log('Login required');
      window.location.replace('/login');
    }

    setLoading(true);
    setError(false);

    fetcher(url, body)
    .then(res => setPayload(res.data))
    .then(() => setLoading(false))
    .catch(e => setError(true));

  }, dependency);

  return { payload, loading, error };
}