import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header(){

  const [ isSearching, setIsSearching ] = useState(false);
  const [ input, setInput ] = useState('');

  const navigate = useNavigate();

  return (
    !isSearching ? 
    <S.Header>
      <S.Logo onClick={() => navigate('/')}>Divo</S.Logo>
      <S.Menu onClick={() => navigate('/keyword-analysis')}>키워드 분석</S.Menu>
      <S.Menu>매출액 분석</S.Menu>
      <S.Menu>키워드 추천</S.Menu>
      <S.Menu>음식점 순위</S.Menu>
      <S.Menu>키워드 매출 연관성</S.Menu>
      <S.Menu>커뮤니티</S.Menu>
      <S.Logo onClick={() => setIsSearching(true)}><i class="fas fa-search"></i></S.Logo>
    </S.Header> :
    <S.Header>
      <S.Logo><i class="fas fa-search"></i></S.Logo>
      <S.Input placeholder="분석할 키워드를 입력하세요" value={input} onChange={e => setInput(e.target.value)}/>
      <S.Logo onClick={() => setIsSearching(false)}><i class="fas fa-times"></i></S.Logo>
    </S.Header>
  );
}

const S = {};

S.Header = styled.div`
  height: 48px;
  flex: 1;
  background: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.Menu = styled.div`
  margin: 0 20px;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    cursor: pointer;
    color: white;
    opacity: 1;
  }
`;

S.Logo = styled(S.Menu)`
  font-family: 'Montserrat';
  font-size: 17px;
  font-weight: 
`;

S.Input = styled.input`
  width: 320px;
  height: 24px;
  line-height: 24px;
  background: none;
  border: none;
  color: white;
  &:focus{
    outline: none;
  }
  &::placeholder{
    color: #f5f5f7;
    opacity: .8;
    font-size: 14px;
  }
  font-size: 16px;
`;