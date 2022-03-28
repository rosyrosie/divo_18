import { useState } from 'react';
import styled from 'styled-components';

export default function Searchbar(){
  const [ input, setInput ] = useState('');
  const [ keyword, setKeyword ] = useState('');

  return (
    <>
      <S.Flex>
        <S.SearchBar>
          <S.Input placeholder="상권·업종·음식점 검색" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && input ? setKeyword(input) : null} />
          {keyword && <S.Clear onClick={() => { setInput(''); setKeyword(''); }}><i className="fas fa-times"></i></S.Clear>}
          <S.Icon onClick={() => input ? setKeyword(input) : null}>
            <i className="fas fa-search"></i>
          </S.Icon>
        </S.SearchBar>
      </S.Flex>
    </>
  );
}

const S = {};

S.Clear = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  color: #263b4d;
  &:hover{
    cursor: pointer;
  }
`;

S.Flex = styled.div`
  position: absolute;
  display: flex;
  padding: 10px 10px 0 10px;
  top: 48px;
  left: 0;
  color: #263b4d;
  z-index: 3;
  backdrop-filter: blur(40px);
`;

S.SearchBar = styled.div`
  display: flex;
  height: 48px;
  border-radius: 8px;
  width: 300px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 2px 4px 12px rgb(38 59 77 / 8%);
`;

S.Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  padding: 15px;
  &:focus{
    outline: none;
  }
  &::placeholder{
    color: #263b4db3;
  }
`;

S.Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  border-left: 1px solid #d2d2d7;
  &:hover{
    cursor: pointer;
  }
`;