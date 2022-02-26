import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "@/components/Header";

export default function KeywordAnalysisBlank(){
  const { corpId } = useParams();
  const [ input, setInput ] = useState('');
  const navigate = useNavigate();
  const CORP_URL = !corpId ? '' : `/cid=${corpId}`;

  return (
    <S.Body>
      <Header />
      <S.Search>
        <S.InputBox>
          <S.Icon><i className="fas fa-search"></i></S.Icon>
          <S.Input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && input ? navigate(CORP_URL + `/keyword-analysis/keyword=${input}`) : null}/>
        </S.InputBox>
      </S.Search>
      <S.ContentBox>
        <S.Content>
          <S.Empty>
            분석할 키워드를 입력해주세요
          </S.Empty>
        </S.Content>
      </S.ContentBox>
    </S.Body>
  );
}

const S = {};

S.Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

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
  color: #1d1d1f;
`;

S.Icon = styled.div`
  font-size: 12px;
  margin-left: 3px;
`;

S.InputBox = styled.div`
  border: 1px solid #d2d2d7;
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
  color: #1d1d1f;
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
  color: #1d1d1f;
`;