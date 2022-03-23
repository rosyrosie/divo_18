import { useState } from 'react';
import styled from 'styled-components';

export default function Searchbar(){
  const [ input, setInput ] = useState('');
  const [ keyword, setKeyword ] = useState('');

  return (
    <>
      <S.Flex>
        <S.SearchBar>
          <S.Input placeholder="상권·업종·브랜드·음식점 검색" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && input ? setKeyword(input) : null} />
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
  color: #515154;
  &:hover{
    cursor: pointer;
  }
`;

S.Flex = styled.div`
  position: absolute;
  display: flex;
  padding: 10px;
  top: 48px;
  left: 0;
`;

S.SearchBar = styled.div`
  display: flex;
  background: white;
  height: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0 rgb(0 0 0 / 2%);
  z-index: 3;
  width: 300px;
  margin-right: 10px;
`;

S.Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  padding: 15px;
  &:focus{
    outline: none;
  }
  color: #1d1d1f;
  &::placeholder{
    color: #515154;
  }
`;

S.Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  border-left: 1px solid #d2d2d7;
  color: #515154;
  &:hover{
    cursor: pointer;
  }
`;