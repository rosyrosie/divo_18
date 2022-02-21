import styled from "styled-components";
import Sidebar from "../components/Sidebar";

export default function Home(){
  return (
    <S.Body>
      <Sidebar />
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  height: 100%;
  display: flex;
`;