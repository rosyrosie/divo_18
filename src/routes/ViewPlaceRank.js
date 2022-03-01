import styled from 'styled-components';
import { useState } from 'react';

export default function ViewPlaceRank(){
  const [ tab, setTab ] = useState(0); //0: view, 1: place


  return (
    <S.Content>
      <S.Intro>검색 노출도</S.Intro>
      <S.SubIntro>키워드 검색 시 내 가게가 몇 번째로 노출되는지 알아보세요</S.SubIntro>
      <S.Tabs>
        <S.Tab isSelected={tab === 0} onClick={() => setTab(0)}>네이버 View</S.Tab>
        <S.Tab isSelected={tab === 1} onClick={() => setTab(1)}>네이버 Place</S.Tab>
      </S.Tabs>
      <S.Box>
        <S.RankList>
          <S.KwCat>상권 키워드</S.KwCat>
          <S.Kws>
            <S.Kw>
              <S.Word>당산 맛집</S.Word>
              <S.Qty>최근 1개월 검색량 <S.Num>2.3만</S.Num></S.Qty>
              <S.Rank>12위</S.Rank>
            </S.Kw>
            <S.Kw>
              <S.Word>당산역 맛집</S.Word>
              <S.Qty>최근 1개월 검색량 <S.Num>2.3만</S.Num></S.Qty>
              <S.Rank>{'>50위'}</S.Rank>
            </S.Kw>
            <S.Kw>
              <S.Word>영등포 맛집</S.Word>
              <S.Qty>최근 1개월 검색량 <S.Num>2.3만</S.Num></S.Qty>
              <S.Rank>14위</S.Rank>
            </S.Kw>
            <S.Kw>
              <S.Word>영등포구청역 맛집</S.Word>
              <S.Qty>최근 1개월 검색량 <S.Num>2.3만</S.Num></S.Qty>
              <S.Rank>{'>50위'}</S.Rank>
            </S.Kw>
          </S.Kws>
        </S.RankList>
      </S.Box>
      <S.Box>
        <S.RankList>
          <S.KwCat>업종 키워드</S.KwCat>
          <S.Kws>
            키워드가 없습니다
          </S.Kws>
        </S.RankList>
      </S.Box>
    </S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  background: #f5f5f7;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: #1d1d1f;
  padding-bottom: 60px;
`;

S.Intro = styled.div`
  width: 60%;
  max-width: 1200px;
  font-weight: bold;
  font-size: 36px;
  padding-top: 60px;
`;

S.SubIntro = styled.div`
  margin-top: 20px;
  width: 60%;
  max-width: 1200px;
  color: #515154;
`;

S.Tabs = styled.div`
  display: flex;
  width: 60%;
  max-width: 1200px;
  margin-top: 40px;
`;

S.Tab = styled.div`
  font-size: 18px;
  padding: 15px 10px;
  margin-right: 20px;
  opacity: .5;
  ${props => props.isSelected ? 'opacity: 1; border-bottom: 2px solid #1d1d1f;' : ''}
  &:hover{
    cursor: pointer;
  }
`;

S.RankList = styled.div`
  width: 100%;
  padding-top: 60px;
`;

S.KwCat = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

S.Kw = styled.div`
  display: flex;
  flex-flow: column;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  padding: 30px;
  width: 230px;
  min-width: 230px;
  margin: 0 10px 10px 0;
`;

S.Word = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

S.Rank = styled.div`
  font-weight: bold;
  font-family: 'Montserrat', 'SUIT';
  font-size: 32px;
  margin-top: 30px;
`;

S.Qty = styled.div`
  font-size: 13px;
  color: #515154;
  display: flex;
`;

S.Num = styled.div`
  font-weight: bold;
  margin-left: 5px;
`;

S.Box = styled.div`
  width: 100%;
  padding-left: 20%;
  max-width: 100%;
`;

S.Kws = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
  align-items: center;
  flex-wrap: wrap;
`;