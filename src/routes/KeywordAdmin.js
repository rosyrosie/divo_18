import { useParams } from 'react-router-dom';
import CorpRequired from '@/components/CorpRequired';
import { PLACE_KEYWORD_URL } from '@api';
import { useFetch } from '@hooks';

export default function KeywordAdmin(){
  const { corpId } = useParams();

  console.log(corpId);
  const { payload, error } = useFetch(
    PLACE_KEYWORD_URL(corpId),
    null,
    'GET',
    [corpId]
  );

  console.log(payload);

  if(corpId === '0'){
    return (
      <CorpRequired />
    );
  }

  return (
    <></>
  );
}

const S = {};