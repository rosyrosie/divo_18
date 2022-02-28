import styled from 'styled-components';
import LoginRequired from '@/components/LoginRequired';
import CorpRequired from '@/components/CorpRequired';
import { useParams } from 'react-router-dom';

export default function Rank(){
  const token = localStorage.getItem('token');
  const { corpId } = useParams();

  if(!token) return (
    <LoginRequired />
  );

  if(corpId === '0') return (
    <CorpRequired />
  );

  return (
    <S.Content></S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;