import styled from 'styled-components';

export default function KeywordBar({ payload, type, setType, setKeyword }){
  return (
    <S.Sidebar>
      <S.List>
        <S.SearchBar>
          <S.Icon><i className="fas fa-search"></i></S.Icon>
          <S.Input placeholder="키워드 검색"/>
        </S.SearchBar>
        <S.KwTypes>
          <S.KwType isSelected={type === 'brand'} onClick={() => setType('brand')}>브랜드</S.KwType>
          <S.KwType isSelected={type === 'section'} onClick={() => setType('section')}>상권</S.KwType>
          <S.KwType isSelected={type === 'category'} onClick={() => setType('category')}>업종</S.KwType>
        </S.KwTypes>
        <S.Scrolls>
          {payload?.[type].map((word, i) => (
            <S.Cell onClick={() => setKeyword({ word, type })}>
              <S.Word>{word}</S.Word>
              <S.Badges>
                <S.Badge bg="#de071c">
                  <i className="fas fa-blog"></i>
                </S.Badge>
                <S.Badge bg="#06c">
                  <i className="fas fa-map-marker-alt"></i>
                </S.Badge>
              </S.Badges>
            </S.Cell>
          ))}
        </S.Scrolls>
      </S.List>
    </S.Sidebar>
  );
}

const S = {};

S.Sidebar = styled.div`
  flex: 1;
  display: flex;
  padding-top: 80px;
`;

S.List = styled.div`
  flex: 1;
  margin-left: 40px;
  display: flex;
  flex-flow: column;
`;

S.SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  background: #f5f5f7;
  margin-bottom: 26px;
`;

S.Input = styled.input`
  background: none;
  border: none;
  width: 100%;
  margin-left: 10px;
  &:focus{
    outline: none;
  }
  color: #1d1d1f;
`;

S.Icon = styled.div`
  font-size: 14px;
  color: #aaaaaa;
`;

S.KwTypes = styled.div`
  display: flex;
  font-size: 13px;
  color: #515154;
  margin-bottom: 20px;
`;

S.KwType = styled.div`
  padding-right: 20px;
  ${props => props.isSelected && 'font-weight: bold; color: #1d1d1f;'}
  &:hover{
    cursor: pointer;
  }
`;

S.Word = styled.div`
  color: #1d1d1f;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

S.Cell = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  flex: 1;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
    background: #f5f5f7;
  }
`;

S.Badges = styled.div`
  display: flex;
`;

S.Badge = styled.div`
  margin-right: 10px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #f5f5f7;
  background: ${props => props.bg};
  font-size: 14px;
  position: relative;
  &:hover ${S.BadgePop}{
    display: flex;
  }
`;

S.Scrolls = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  max-height: 100%;
`;
