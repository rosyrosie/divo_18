import styled from 'styled-components';
import Header from '../components/Header';

export default function CorpManagement(){
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