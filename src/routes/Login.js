import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import axios from 'axios';
import { LOGIN_URL } from '../environments/Api';

export default function Login(){

  const navigate = useNavigate();

  const [ id, setId ] = useState('');
  const [ pwd, setPwd ] = useState('');

  const login = e => {
    if(e.key !== 'Enter') return;
    const body = {
      email: id,
      password: pwd
    }
    axios.post(LOGIN_URL, body).then(res => {
      if(res.data.token){
        localStorage.clear();
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
      else{
        alert('일치하는 계정이 없습니다');
        setPwd('');
        localStorage.clear();
      }
    }).catch(e => {
      console.log('POST Error');
    });
  }

  return (
    <S.Body>
      <Header />
      <S.Content>
        <S.Text>로그인하기</S.Text>
        <S.Input placeholder="이메일 또는 전화번호" type="email" value={id} onChange={e => setId(e.target.value)} />
        <S.Input placeholder="비밀번호" type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyPress={login} />
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