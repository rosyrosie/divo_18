import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import KeywordReport from "../components/KeywordReport";

export default function KeywordAnalysis(){

  const [ keyword, setKeyword ] = useState('');
  const [ input, setInput ] = useState('');
  const [ tab, setTab ] = useState(0);

  return (
    <S.Body>
      <Header />
      <S.Search>
        <S.InputBox>
          <S.Icon><i className="fas fa-search"></i></S.Icon>
          <S.Input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && input ? setKeyword(input) : null}/>
        </S.InputBox>
      </S.Search>
      <S.TabBox>
        <S.Tabs>
          <S.Tab onClick={() => setTab(0)} isSelected={tab===0}>키워드 검색량</S.Tab>
          <S.Tab onClick={() => setTab(1)} isSelected={tab===1}>컨텐츠 발행량</S.Tab>
          <S.Tab onClick={() => setTab(2)} isSelected={tab===2}>검색자 특성</S.Tab>
          <S.Tab onClick={() => setTab(3)} isSelected={tab===3}>마케팅 지표</S.Tab>
        </S.Tabs>
      </S.TabBox>
      <S.ContentBox>
        <S.Content>
          {keyword ?
          <KeywordReport />
          : 
          <S.Empty>
            분석할 키워드를 입력해주세요
          </S.Empty>}
        </S.Content>
      </S.ContentBox>
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

S.Search = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  color: #aaaaaa;
`;

S.Icon = styled.div`
  font-size: 12px;
  margin-left: 3px;
`;

S.InputBox = styled.div`
  border: 1px solid #aaaaaa;
  border-radius: 30px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
`;

S.Input = styled.input`
  background: none;
  margin-left: 10px;
  height: 100%;
  width: 300px;
  border: none;
  &:focus{
    outline: none;
  }
`;

S.TabBox = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #aaaaaa;
  position: sticky;
  top: 0;
  //backdrop-filter: blur(3px);
  background: white;
`;

S.Tabs = styled.div`
  width: 60%;
  display: flex;
  font-size: 12px;
  max-width: 1200px;
`;

S.Tab = styled.div`
  padding: 10px 15px;
  color: #1d1d1f;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  ${props => props.isSelected ? 'border-bottom: 1px solid black; opacity: 1;' : ''}
`;

S.ContentBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

S.Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

S.Empty = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: bold;
  font-size: 40px;
`;