import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { contractText } from '../environments/Variables';

export default function Signup(){

  const navigate = useNavigate();

  const [ agreed, setAgreed ] = useState(false);
  const [ phoneCheck, setPhoneCheck ] = useState(false);
  const [ phoneAuth, setPhoneAuth ] = useState(false);
  const [ authCode, setAuthCode ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ pwd1, setPwd1 ] = useState('');
  const [ pwd2, setPwd2 ] = useState('');

  const pwdError = pwd1 && pwd2 && pwd1 !== pwd2;
  const signUpError = pwdError || !name || !email || !pwd1 || !pwd2;

  const checkPhoneError = phone => {
    return false;
  }

  const phoneError = phone && checkPhoneError(phone);

  const sendAuthCode = e => {
    setPhoneCheck(true);
  }

  const checkAuthCode = e => {
    setPhoneAuth(true);
  }

  return (
    agreed ?
      phoneAuth ? 
      <S.Body>
        <Header />
        <S.Content>
          <S.Text>회원가입</S.Text>
          <S.Input value={phone} disabled/>
          <S.Input placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
          <S.Input placeholder="이메일" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <S.Input placeholder="비밀번호" type="password" value={pwd1} onChange={e => setPwd1(e.target.value)} error={pwdError} />
          <S.Input placeholder="비밀번호 확인" type="password" value={pwd2} onChange={e => setPwd2(e.target.value)} error={pwdError} />
          <S.Error error={pwdError}>비밀번호가 일치하지 않습니다</S.Error>
          <S.Button error={signUpError}>회원가입</S.Button>
          <S.SignUp>회원이신가요?<S.Blue onClick={() => navigate('/login')}>로그인하기</S.Blue></S.SignUp>
        </S.Content>
      </S.Body> :
      phoneCheck ? 
      <S.Body>
        <Header />
        <S.Content>
          <S.Text>휴대전화 인증</S.Text>
          <S.Input disabled value={phone} />
          <S.Input placeholder="인증번호" value={authCode} onChange={e => setAuthCode(e.target.value)} />
          <S.Button error={!authCode} onClick={checkAuthCode}>인증하기</S.Button>
        </S.Content>
      </S.Body> :
      <S.Body>
        <Header />
        <S.Content>
          <S.Text>휴대전화 인증</S.Text>
          <S.Input placeholder="전화번호" type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" value={phone} onChange={e => setPhone(e.target.value)} error={phoneError} />
          <S.Error error={phoneError}>전화번호 형식이 올바르지 않습니다.</S.Error>
          <S.Button error={phoneError} onClick={sendAuthCode}>인증번호 받기</S.Button>
        </S.Content>
      </S.Body> :
      <S.Body>
      <Header />
        <S.Content>
          <S.Text>이용약관</S.Text>
          <S.Contract>
            {contractText}
          </S.Contract>
          <S.Button onClick={() => setAgreed(true)}>동의</S.Button>
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

S.Contract = styled.div`
  border: 1px solid #d2d2d7;
  padding: 20px;
  width: 500px;
  height: 500px;
  overflow-y: auto;
  line-height: 150%;
  margin-bottom: 10px;
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
  display: flex;
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

S.Error = styled.div`
  color: #de071c;
  font-size: 12px;
  ${props => !props.error && 'display: none;'}
`;

S.Button = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
  border-radius: 5px;
  color: rgba(245, 245, 247, 0.8);
  background: #06c;
  border: none;
  ${props => !props.error ? '&:hover{cursor:pointer; color: #f5f5f7;}' : 'opacity: .3;'};
`;