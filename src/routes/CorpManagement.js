import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import LoginRequired from '../components/LoginRequired';

export default function CorpManagement(){
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if(!token) return (
    <S.Body>
      <Header />
      <LoginRequired />
    </S.Body>
  );

  return (
    <S.Body>
      <Header />
      <S.Content>
        <S.Add onClick={() => navigate('/corp-addition')}>브랜드 추가하기</S.Add>
      </S.Content>
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1;
`;

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Add = styled.div`
  color: #06c;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
`;