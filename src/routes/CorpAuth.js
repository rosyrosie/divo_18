import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CORP_AUTH_URL } from '@api';
import { useFetch } from '@hooks';

export default function CorpAuth(){
  const { corpId } = useParams();
  const { payload, error } = useFetch(
    CORP_AUTH_URL + corpId,
    null,
    'GET'
  );

  console.log(payload);

  return (
    <></>
  );
}

const S = {};