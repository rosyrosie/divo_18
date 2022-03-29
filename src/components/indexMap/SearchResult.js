import styled from 'styled-components';

export default function SearchResult({ searchInput, setQuery }){
  return (
    <S.Body>
      {searchInput}
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  padding: 68px 20px 20px 20px;
  color: #263b4d;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: saturate(180%) blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: absolute;
  top: 48px;
  left: 0;
  bottom: 0;
  width: 320px;
  box-shadow: 2px 4px 12px rgb(38 59 77 / 20%);
  &::-webkit-scrollbar-thumb {
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 10px;
  }
  &::-webkit-scrollbar{
    background-color: transparent;
  }
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
`;