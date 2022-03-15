import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { lineData, lineOptions } from '@constants';
import { applyStyleToChart, applyMultiAxisToChart } from '@functions';
import { useFetch } from '@hooks';
import { PLACE_KEYWORD_URL, KS_CHART_URL, KS_STAT_URL } from '@api';
import { useParams } from 'react-router-dom';
import SyncRequired from '@/components/errorPage/SyncRequired';
import StatBox from '@/components/keywordScore/StatBox';
import KeywordBar from '@/components/keywordScore/KeywordBar';

export default function KeywordScore(){
  const { corpId } = useParams();
  const [ scale, setScale ] = useState(0);
  const [ type, setType ] = useState('brand');
  const [ keyword, setKeyword ] = useState(null);

  const typeToString = {
    brand: '브랜드',
    section: '상권',
    category: '업종'
  }

  const ranges = ['30일', '3개월', '6개월', '1년', '2년', '전체'];

  const { payload, error } = useFetch(
    PLACE_KEYWORD_URL(corpId, true),
    null,
    'GET',
    [corpId]
  );

  const defaultKeyword = payload?.brand.length ? { word: payload?.brand[0].keyword, type: 'brand' } : payload?.section.length ? { word: payload?.section[0].keyword, type: 'section' } : payload?.category.length ? { word: payload?.category[0].keyword, type: 'category' } : null;

  useEffect(() => setKeyword(defaultKeyword), [payload]);

  const { payload: kPayload, error: kError } = useFetch(
    KS_CHART_URL(corpId, keyword?.word),
    null,
    'GET',
    [keyword, corpId],
    keyword
  );

  const { payload: sPayload, loading: sLoading, error: sError } = useFetch(
    KS_STAT_URL(corpId, keyword?.word),
    null,
    'GET',
    [keyword, corpId],
    keyword
  );

  if(kPayload?.message === 'on sync' || sPayload?.message === 'on sync'){
    return (
      <SyncRequired onSync />
    )
  }

  if(kPayload?.message === 'sync needed' || sPayload?.message === 'sync needed'){
    return (
      <SyncRequired onSync={false} />
    )
  }

  return (
    <S.View>
      <S.Body>
        <S.Main>
          <S.Keyword>
            {keyword?.word}
            <S.Type>{typeToString[keyword?.type]} 키워드</S.Type>
          </S.Keyword>
          <S.Flex>
            {/* <S.Badges>
              <S.Badge bg="#de071c">
                <i className="fas fa-blog"></i>
                <S.BadgePop>블로그·카페 마케팅 추천 키워드입니다.</S.BadgePop>
              </S.Badge>
              <S.Badge bg="#06c">
                <i className="fas fa-map-marker-alt"></i>
                <S.BadgePop>Place 마케팅 추천 키워드입니다.</S.BadgePop>
              </S.Badge>
            </S.Badges> */}
            <S.Scales>
              {ranges.map((range, i) => (
                <S.Scale key={i} isSelected={scale === i} onClick={() => setScale(i)}>{range}</S.Scale> 
              ))}
            </S.Scales>
          </S.Flex>
          <S.Chart>
            {(keyword && kPayload?.keywordSalesGraph) && <Line options={lineOptions('건', true, false, true, false, true)} data={applyMultiAxisToChart(applyStyleToChart(kPayload?.keywordSalesGraph?.[scale], 'light'))} />}
          </S.Chart>
          {sPayload && <StatBox type={keyword?.type} stats={sPayload} loading={sLoading} />}
        </S.Main>
        <KeywordBar payload={payload} type={type} setType={setType} setKeyword={setKeyword} />
      </S.Body>
    </S.View>
  );
}

const S = {};

S.View = styled.div`
  flex: 1;
`;

S.Flex = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

S.Body = styled.div`
  width: 60%;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  display: flex;
`;

S.Main = styled.div`
  flex: 3;
  display: flex;
  flex-flow: column;
`;

S.Keyword = styled.div`
  margin-top: 80px;
  color: #1d1d1f;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: end;
`;

S.Type = styled.div`
  color: #515154;
  font-size: 16px;
  font-weight: normal;
  margin-left: 10px;
`;

S.Scales = styled.div`
  display: flex;
  justify-content: right;
  color: #515154;
  margin-top: 20px;
  margin-bottom: 10px;
`;

S.Scale = styled.div`
  padding: 0 10px;
  font-size: 13px;
  ${props => props.isSelected && 'color: #1d1d1f; font-weight: bold;'}
  &:hover{
    cursor: pointer;
  }
`;

S.Chart = styled.div`
  margin-top: 10px;
`;

S.BadgePop = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  background: #1d1d1f;
  padding: 10px;
  border-radius: 10px;
  color: #f5f5f7;
  line-height: 150%;
  display: none;
  font-size: 12px;
  width: max-content;
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