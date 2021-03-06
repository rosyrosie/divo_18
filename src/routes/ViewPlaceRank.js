import styled from 'styled-components';
import { useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { VIEW_PLACE_RANK_URL, RANK_CHART_URL } from '@api';
import { useFetch } from '@hooks';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { useDetectOutsideClick } from '@hooks';
import KeywordBox from '@/components/viewPlaceRank/KeywordBox';
import ChartModal from '@/components/viewPlaceRank/ChartModal';

export default function ViewPlaceRank(){
  const mode = ['view', 'place'];
  const [ tab, setTab ] = useState(0); //0: view, 1: place
  const [ sort, setSort ] = useState("searchAmount");
  const modalRef = useRef(null);
  const [ showModal, setShowModal ] = useDetectOutsideClick(modalRef, false);
  const [ chartKeyword, setChartKeyword ] = useState({
    list: null,
    index: null
  });
  
  const { corpId } = useParams();

  const { payload, error } = useFetch(
    VIEW_PLACE_RANK_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== '0'
  );

  const { payload: chartPayload, error: chartError } = useFetch(
    RANK_CHART_URL(corpId, chartKeyword.list?.[chartKeyword.index].keyword || 'null', mode[tab]),
    null,
    'GET',
    [chartKeyword],
    corpId !== '0'
  );
  const chartData = chartPayload?.rankGraph;

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

  const clickKeyword = (list, index) => {
    setChartKeyword({
      list: list, 
      index: index
    });
    setShowModal(true);
  }

  if(corpId === '0') return (
    <CorpRequired />
  );

  return (
    <>
      <S.Content>
        <S.Intro>?????? ?????????</S.Intro>
        <S.SubIntro>????????? ?????? ??? ??? ????????? ??? ????????? ??????????????? ???????????????</S.SubIntro>
        <S.Toggles>
          <S.Tabs>
            <S.Tab isSelected={tab === 0} onClick={() => setTab(0)}>????????? View</S.Tab>
            <S.Tab isSelected={tab === 1} onClick={() => setTab(1)}>????????? Place</S.Tab>
          </S.Tabs>
          <div>
            <S.Select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rank">????????? ???</option>
              <option value="searchAmount">????????? ???</option>
            </S.Select>
          </div>
        </S.Toggles>
        <S.Box>
          <S.RankList>
            <S.KwCat>?????? ?????????</S.KwCat>
            <S.Kws>
              {sortedSectionList?.map((rank, index) => (
                <KeywordBox rank={rank} index={index} tab={tab} list={sortedSectionList} clickKeyword={clickKeyword} key={rank.keyword} />
              ))}
              {(payload && !sortedSectionList?.length) && '???????????? ????????????'}
            </S.Kws>
          </S.RankList>
        </S.Box>
        <S.Box>
          <S.RankList>
            <S.KwCat>?????? ?????????</S.KwCat>
            <S.Kws>
              {sortedCategoryList?.map((rank, index) => (
                <KeywordBox rank={rank} index={index} tab={tab} list={sortedCategoryList} clickKeyword={clickKeyword} key={rank.keyword} />
              ))}
              {(payload && !sortedCategoryList?.length) && '???????????? ????????????'}
            </S.Kws>
          </S.RankList>
        </S.Box>
      </S.Content>
      {
        showModal &&
        <ChartModal modalRef={modalRef} setShowModal={setShowModal} chartKeyword={chartKeyword} setChartKeyword={setChartKeyword} chartData={chartData} />
      }
    </>
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