import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

export default function Signup(){

  const navigate = useNavigate();
  const [ phone, setPhone ] = useState('010-4184-2396');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ pwd1, setPwd1 ] = useState('');
  const [ pwd2, setPwd2 ] = useState('');

  const pwdError = pwd1 && pwd2 && pwd1 !== pwd2;
  const signUpError = pwdError || !name || !email || !pwd1 || !pwd2;

  return (
    <S.Body>
      <Header />
      <S.Content>
        <S.Text>회원가입</S.Text>
        <S.Input value={phone} disabled/>
        <S.Input placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
        <S.Input placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
        <S.Input placeholder="비밀번호" type="password" value={pwd1} onChange={e => setPwd1(e.target.value)} error={pwdError} />
        <S.Input placeholder="비밀번호 확인" type="password" value={pwd2} onChange={e => setPwd2(e.target.value)} error={pwdError} />
        <S.Error error={pwdError}>비밀번호가 일치하지 않습니다</S.Error>
        <S.Button error={signUpError}>회원가입</S.Button>
        <S.SignUp>회원이신가요?<S.Blue onClick={() => navigate('/login')}>로그인하기</S.Blue></S.SignUp>
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
  ${props => props.error ? 'border: 1px solid #de071c; &:focus{outline:none;}' : ''} 
`;

S.SignUp = styled.div`
  font-size: 14px;
  margin-top: 40px;
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

S.Error = styled.div`
  color: #de071c;
  font-size: 12px;
  ${props => !props.error && 'visibility: hidden;'}
`;

S.Button = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 5px;
  color: #f5f5f7;
  background: #06c;
  border: none;
  ${props => !props.error ? '&:hover{cursor:pointer;}' : 'opacity: .3;'};
`;