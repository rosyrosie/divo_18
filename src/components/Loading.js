import styled from 'styled-components';

export default function Loading({ isWhite }){
  return (
    <S.Content isWhite={isWhite}>
      Loading
    </S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.isWhite ? '#f5f5f7' : '#1d1d1f'};
  width: 100%;
  height: 100%;
  font-weight: bold;
`;