import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function KeywordAnalysis(){

  const [ keyword, setKeyword ] = useState('');

  return (
    <S.Body>
      <Header />
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  height: 100%;
  display: flex;
`;

