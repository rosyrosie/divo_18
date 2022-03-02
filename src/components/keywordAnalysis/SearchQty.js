import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { KA_AMOUNT_URL } from '@api';
import { useFetch } from '@hooks';
import { keywordCommentList } from '@constants';
import CommentSection from '@/components/keywordAnalysis/CommentSection';
import Loading from '@/components/Loading';

export default function SearchQty({ qtyInView }){

  const { keyword } = useParams();
  const trigger = useRef(null);

  if(qtyInView) trigger.current = true;

  const { payload, loading, error } = useFetch(
    KA_AMOUNT_URL + keyword,     
    null,
    'GET',
    [keyword, trigger.current],
    trigger.current
  );

  const qtyData = payload?.amount;
  const trendData = payload?.trend;

  return (
    <div id="search-qty">
      <CommentSection comment={keywordCommentList[0]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              {!loading ? 
                <>
                  <S.Day>최근 1일 검색량</S.Day>
                  <S.Date>{qtyData?.[0][0][0].date}</S.Date>
                  <S.Stat>{qtyData?.[0][0][0].amount}</S.Stat>
                  {qtyData?.[0][1].map((delta, i) => (
                    <S.Compare key={delta.id}>{delta.id}<S.Delta color={delta.color}>{delta.change}</S.Delta></S.Compare>
                  ))}
                </>
                :
                <Loading />
              }
            </S.Col>
            <S.Col index={1}>
              {!loading ?
                <>
                  <S.Day>최근 1주일 검색량</S.Day>
                  <S.Date>{qtyData?.[1][0][0].date}</S.Date>
                  <S.Stat>{qtyData?.[1][0][0].amount}</S.Stat>
                  {qtyData?.[1][1].map((delta, i) => (
                    <S.Compare key={delta.id}>{delta.id}<S.Delta color={delta.color}>{delta.change}</S.Delta></S.Compare>
                  ))}
                </>
                :
                <Loading />
              }
            </S.Col>
            <S.Col index={2}>
              {
                !loading ?
                <>
                  <S.Day>최근 1개월 검색량</S.Day>
                  <S.Date>{qtyData?.[2][0][0].date}</S.Date>
                  <S.Stat>{qtyData?.[2][0][0].amount}</S.Stat>
                  {qtyData?.[2][1].map((delta, i) => (
                    <S.Compare key={delta.id}>{delta.id}<S.Delta color={delta.color}>{delta.change}</S.Delta></S.Compare>
                  ))}
                </> :
                <Loading />
              }
            </S.Col>
          </S.Stats>
        </S.Width>
      </S.Section>
      <CommentSection comment={keywordCommentList[1]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              {
                !loading ?
                <>
                  <S.Day>최근 30일 추세</S.Day>
                  <S.Date>{trendData?.[0].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[0].trend === '데이터 부족'}>{trendData?.[0].trend}<S.Scale>{trendData?.[0].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
            <S.Col index={1}>
              {
                !loading ?
                <>
                  <S.Day>최근 3개월 추세</S.Day>
                  <S.Date>{trendData?.[1].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[1].trend === '데이터 부족'}>{trendData?.[1].trend}<S.Scale>{trendData?.[1].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
            <S.Col index={2}>
              {
                !loading ?
                <>
                  <S.Day>최근 6개월 추세</S.Day>
                  <S.Date>{trendData?.[2].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[2].trend === '데이터 부족'}>{trendData?.[2].trend}<S.Scale>{trendData?.[2].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
          </S.Stats>
        </S.Width>
      </S.Section>
      <CommentSection comment={keywordCommentList[2]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              {
                !loading ?
                <>
                  <S.Day>최근 1년 추세</S.Day>
                  <S.Date>{trendData?.[3].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[3].trend === '데이터 부족'}>{trendData?.[3].trend}<S.Scale>{trendData?.[3].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
            <S.Col index={1}>
              {
                !loading ?
                <>
                  <S.Day>최근 2년 추세</S.Day>
                  <S.Date>{trendData?.[4].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[4].trend === '데이터 부족'}>{trendData?.[4].trend}<S.Scale>{trendData?.[4].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
            <S.Col index={2}>
              {
                !loading ?
                <>
                  <S.Day>최근 3년 추세</S.Day>
                  <S.Date>{trendData?.[5].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[5].trend === '데이터 부족'}>{trendData?.[5].trend}<S.Scale>{trendData?.[5].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
          </S.Stats>
        </S.Width>
      </S.Section>
      <CommentSection comment={keywordCommentList[3]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              {
                !loading ?
                <>
                  <S.Day>최근 4년 추세</S.Day>
                  <S.Date>{trendData?.[6].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[6].trend === '데이터 부족'}>{trendData?.[6].trend}<S.Scale>{trendData?.[6].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
            <S.Col index={1}>
              {
                !loading ?
                <>
                  <S.Day>최근 5년 추세</S.Day>
                  <S.Date>{trendData?.[7].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[7].trend === '데이터 부족'}>{trendData?.[7].trend}<S.Scale>{trendData?.[7].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
            <S.Col index={2}>
              {
                !loading ?
                <>
                  <S.Day>전체 추세</S.Day>
                  <S.Date>{trendData?.[8].date}</S.Date>
                  <S.Stat isEmpty={trendData?.[8].trend === '데이터 부족'}>{trendData?.[8].trend}<S.Scale>{trendData?.[8].unit}</S.Scale></S.Stat>
                </> :
                <Loading />
              }
            </S.Col>
          </S.Stats>
        </S.Width>
      </S.Section>
    </div>
  );
}

const S = {};

S.Section = styled.div`
  width: 100%;
  ${props => `background: ${props.color};`}
  display: flex;
  justify-content: center;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  flex-flow: column;
  padding: 50px 0;
`;

S.Col = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  ${props => props.index===1 ? 'margin: 0 40px;' : ''}
  ${props => props.isWhite ? 'background: none; box-shadow: none;' : ''}
  min-height: 250px;
`;

S.Stats = styled.div`
  display: flex;
  ${props => props.isWhite ? 'margin-top: 40px;' : ''}
`;

S.Day = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  margin: 10px 0 20px 0;
  color: #1d1d1f;
`;

S.Date = styled.div`
  display: flex;
  color: #515154;
  margin-bottom: 40px;
  ${props => props.isWhite ? 'color: white;' : ''}
  font-size: 14px;
`;

S.Stat = styled.div`
  display: flex;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 40px;
  font-family: 'Montserrat', 'SUIT';
  display: flex;
  ${props => props.isWhite ? 'margin: 0;' : ''}
  color: #1d1d1f;
  ${props => props.isEmpty && 'font-size: 24px; font-weight: normal; padding-top: 16px;'}
  align-items: end;
`;

S.Compare = styled.div`
  display: flex;
  color: #515154;
  margin-bottom: 10px;
  align-items: center;
  font-family: 'Montserrat', 'SUIT';
`;

S.Delta = styled.div`
  margin-left: 10px;
  color: ${props => props.color === 'blue' ? '#de071c' : '#06c'};
  font-size: 14px;
  font-weight: 500;
`;

S.Scale = styled.div`
  font-family: 'SUIT';
  font-size: 20px;
  padding-bottom: 5px;
  padding-left: 5px;
`;