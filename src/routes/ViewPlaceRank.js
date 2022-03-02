import styled from 'styled-components';
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { VIEW_PLACE_RANK_URL } from '@api';
import { useFetch } from '@hooks';
import LoginRequired from '@/components/errorPage/LoginRequired';
import CorpRequired from '@/components/errorPage/CorpRequired';

export default function ViewPlaceRank(){
  const [ tab, setTab ] = useState(0); //0: view, 1: place
  const { corpId } = useParams();
  const { payload, error } = useFetch(
    VIEW_PLACE_RANK_URL + corpId,
    null,
    'GET',
    [corpId]
  );
  const token = localStorage.getItem('token');
  const [ sort, setSort ] = useState("rank");

  const mode = ['view', 'place'];
  const maxRank = [31, 51];
  const replaceString = ['30+', '50+'];

  const sortedSectionList = useMemo(() => {
    var sectionList = payload?.section;
    sectionList?.sort((a, b) => {
      return (a[sort==='rank' ? mode[tab] : 'searchAmount'] - b[sort==='rank' ? mode[tab] : 'searchAmount'])*(sort==='rank' ? 1 : -1);
    });
    return sectionList;
  }, [sort, tab, payload]);

  const sortedCategoryList = useMemo(() => {
    var categoryList = payload?.category;
    categoryList?.sort((a, b) => {
      return (a[sort==='rank' ? mode[tab] : 'searchAmount'] - b[sort==='rank' ? mode[tab] : 'searchAmount'])*(sort==='rank' ? 1 : -1);
    });
    return categoryList;
  }, [sort, tab, payload]);

  if(!token) return (
    <LoginRequired />
  );

  if(corpId === '0') return (
    <CorpRequired />
  );

  return (
    <S.Content>
      <S.Intro>검색 노출도</S.Intro>
      <S.SubIntro>키워드 검색 시 내 가게가 몇 번째로 노출되는지 알아보세요</S.SubIntro>
      <S.Toggles>
        <S.Tabs>
          <S.Tab isSelected={tab === 0} onClick={() => setTab(0)}>네이버 View</S.Tab>
          <S.Tab isSelected={tab === 1} onClick={() => setTab(1)}>네이버 Place</S.Tab>
        </S.Tabs>
        <div>
          <S.Select onChange={e => setSort(e.target.value)}>
            <option value="rank" selected>노출도 순</option>
            <option value="searchQty">검색량 순</option>
          </S.Select>
        </div>
      </S.Toggles>
      <S.Box>
        <S.RankList>
          <S.KwCat>상권 키워드</S.KwCat>
          <S.Kws>
            {sortedSectionList?.map(rank => {
              const sign = rank[mode[tab]+'Delta'] > 0 ? 1 : rank[mode[tab]+'Delta'] === 0 ? 0 : -1;
              return (
                <S.Fit key={rank.keyword}>
                  <S.Kw>
                    <S.Word>{rank.keyword}</S.Word>
                    <S.Qty>최근 1개월 검색량 <S.Num>{rank.searchAmount.toLocaleString()}</S.Num></S.Qty>
                    <S.Rank>
                      {rank[mode[tab]] !== maxRank[tab] ? rank[mode[tab]] : replaceString[tab]}위
                      <S.Delta sign={sign}>
                        <S.Icon>
                          {sign > 0 ? 
                            <i class="fas fa-caret-up"></i> :
                          sign < 0 ?
                            <i class="fas fa-caret-down"></i> :
                            <S.Zero>-</S.Zero>
                          }
                        </S.Icon>
                        {Math.abs(rank[mode[tab] + 'Delta']) || ''}
                      </S.Delta>
                    </S.Rank>
                  </S.Kw>
                </S.Fit>
              );
            })}
            {(payload && !sortedSectionList.length) && '키워드가 없습니다'}
          </S.Kws>
        </S.RankList>
      </S.Box>
      <S.Box>
        <S.RankList>
          <S.KwCat>업종 키워드</S.KwCat>
          <S.Kws>
            {sortedCategoryList?.map(rank => {
              const sign = rank[mode[tab]+'Delta'] > 0 ? 1 : rank[mode[tab]+'Delta'] === 0 ? 0 : -1;
              return (
                <S.Fit key={rank.keyword}>
                  <S.Kw>
                    <S.Word>{rank.keyword}</S.Word>
                    <S.Qty>최근 1개월 검색량 <S.Num>{rank.searchAmount.toLocaleString()}</S.Num></S.Qty>
                    <S.Rank>
                      {rank[mode[tab]] !== maxRank[tab] ? rank[mode[tab]] : replaceString[tab]}위
                      <S.Delta sign={sign}>
                        <S.Icon>
                          {sign > 0 ? 
                            <i class="fas fa-caret-up"></i> :
                          sign < 0 ?
                            <i class="fas fa-caret-down"></i> :
                            <S.Zero>-</S.Zero>
                          }
                        </S.Icon>
                        {Math.abs(rank[mode[tab] + 'Delta']) || ''}
                      </S.Delta>
                    </S.Rank>
                  </S.Kw>
                </S.Fit>
              );
            })}
            {(payload && !sortedCategoryList.length) && '키워드가 없습니다'}
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

S.Zero = styled.div`
  font-size: 32px;
`;

S.Toggles = styled.div`
  display: flex;
  width: 60%;
  margin-top: 40px;
  justify-content: space-between;
  align-items: center;
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
  margin: 5px;
  flex: 1;
  &:hover{
    cursor: pointer;
    transform: scale(1.02);
  }
  transition: .3s;
`;

S.Word = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

S.Qty = styled.div`
  font-size: 13px;
  color: #515154;
  display: flex;
`;

S.Num = styled.div`
  font-weight: 600;
  margin-left: 5px;
  font-family: 'Montserrat';
`;

S.Box = styled.div`
  width: 60%;
`;

S.Kws = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
  align-items: center;
  flex-wrap: wrap;
`;

S.Select = styled.select`
  padding: 5px;
  background: none;
  border: none;
  font-size: 14px;
  &:hover{
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

S.Fit = styled.div`
  width: 20%;
  display: flex;
`;

S.Rank = styled.div`
  font-weight: 600;
  font-family: 'Montserrat', 'SUIT';
  font-size: 28px;
  margin-top: 30px;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

S.Delta = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${props => props.sign===1 ? '#de071c' : !props.sign ? '#1d1d1f' : '#06c'};
`;

S.Icon = styled.div`
  font-size: 16px;
  margin-right: 3px;
`;