import styled from 'styled-components';
import { Rolling } from 'react-loading-io';

export default function Loading({ isWhite }){
  return (
    <S.Content>
      <Rolling color={isWhite ? '#f5f5f7' : '#1d1d1f'} width={3} size={80}/>
    </S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
`;