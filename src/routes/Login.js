import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

export default function Login(){

  const navigate = useNavigate();

  return (
    <S.Body>
      <Header />
      <S.Content>
        <S.Text>로그인하기</S.Text>
        <S.Input placeholder="이메일 또는 전화번호"/>
        <S.Input placeholder="비밀번호" type="password"/>
        <S.SignUp>회원이 아니신가요?<S.Blue onClick={() => navigate('/signup')}>회원가입하기</S.Blue></S.SignUp>
      </S.Content>
      <S.Content />
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
  flex-flow: column;
  color: #1d1d1f;
`;

S.Text = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.Input = styled.input`
  width: 400px;
  padding: 15px;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  margin-bottom: 10px;
  &:focus{
    outline-color: #06c;
  }
`;

S.SignUp = styled.div`
  font-size: 14px;
  margin-top: 20px;
  color: #515154;
  display: flex;
`;

S.Blue = styled.div`
  color: #06c;
  margin-left: 5px;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
`;