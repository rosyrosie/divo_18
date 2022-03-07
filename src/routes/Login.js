import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { LOGIN_URL } from '@api';

export default function Login(){

  const navigate = useNavigate();

  const [ id, setId ] = useState('');
  const [ pwd, setPwd ] = useState('');

  const handleLogin = e => {
    const body = {
      email: id,
      password: pwd
    }
    axios.post(LOGIN_URL, body).then(res => {
      if(res.data.token){
        localStorage.clear();
        localStorage.setItem('token', res.data.token);
        const defaultCorpId = res.data.corpList[0]?.[0];
        navigate(defaultCorpId ? `/cid=${defaultCorpId}` : '/cid=0');
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
    <>
      <S.Content>
        <S.Text>로그인하기</S.Text>
        <S.Input placeholder="이메일 또는 전화번호" type="email" value={id} onChange={e => setId(e.target.value.replaceAll('-', ''))} />
        <S.Input placeholder="비밀번호" type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyPress={e => e.key==='Enter' ? handleLogin(e) : null} />
        <S.Button onClick={handleLogin}>로그인</S.Button>
        <S.SignUp>회원이 아니신가요?<S.Blue onClick={() => navigate('/signup')}>회원가입하기</S.Blue></S.SignUp>
      </S.Content>
      <S.Content />
    </>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #1d1d1f;
`;

S.Button = styled.button`
  margin-top: 10px;
  padding: 12px 20px;
  border-radius: 5px;
  color: rgba(245, 245, 247, 0.8);
  background: #06c;
  border: none;
  ${props => !props.error ? '&:hover{cursor:pointer; color: #f5f5f7;}' : 'opacity: .3;'};
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