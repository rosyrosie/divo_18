import styled from 'styled-components';
import Header from '../components/Header';

export default function SalesAnalysis(){
  return (
    <S.Body>
      <Header dark={true}/>
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