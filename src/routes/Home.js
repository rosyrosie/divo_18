import styled from "styled-components";
import Header from "../components/Header";
import LoginRequired from "../components/LoginRequired";

export default function Home(){
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
  flex-flow: column;
  flex: 1;
`;

S.Content = styled.div`
  flex: 1;
`;

