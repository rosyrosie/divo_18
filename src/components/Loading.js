import styled from 'styled-components';
import { Rolling } from 'react-loading-io';

export default function Loading({ isWhite = false, size = 80, align = 'center' }){
  return (
    <S.Content>
      <Rolling color={isWhite ? '#f5f5f7' : '#1d1d1f'} width={3} size={size} align={align} />
    </S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${props => props.align};
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
`;