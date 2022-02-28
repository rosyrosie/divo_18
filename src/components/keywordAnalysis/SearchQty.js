import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { KA_AMOUNT_URL } from '@api';
import { useFetch } from '@hooks';
import { keywordCommentList } from '@constants';
import CommentSection from '@/components/keywordAnalysis/CommentSection';

export default function SearchQty({ qtyInView }){

  const { keyword } = useParams();
  const trigger = useRef(null);

  if(qtyInView) trigger.current = true;

  const { payload, error } = useFetch(
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
              <S.Day>최근 1일 검색량</S.Day>
              <S.Date>{qtyData?.[0][0][0].date}</S.Date>
              <S.Stat>{qtyData?.[0][0][0].amount}</S.Stat>
              {qtyData?.[0][1].map((delta, i) => (
                <S.Compare key={delta.id}>{delta.id}<S.Delta color={delta.color}>{delta.change}</S.Delta></S.Compare>
              ))}
            </S.Col>
            <S.Col index={1}>
              <S.Day>최근 1주일 검색량</S.Day>
              <S.Date>{qtyData?.[1][0][0].date}</S.Date>
              <S.Stat>{qtyData?.[1][0][0].amount}</S.Stat>
              {qtyData?.[1][1].map((delta, i) => (
                <S.Compare key={delta.id}>{delta.id}<S.Delta color={delta.color}>{delta.change}</S.Delta></S.Compare>
              ))}
            </S.Col>
            <S.Col index={2}>
              <S.Day>최근 1개월 검색량</S.Day>
              <S.Date>{qtyData?.[2][0][0].date}</S.Date>
              <S.Stat>{qtyData?.[2][0][0].amount}</S.Stat>
              {qtyData?.[2][1].map((delta, i) => (
                <S.Compare key={delta.id}>{delta.id}<S.Delta color={delta.color}>{delta.change}</S.Delta></S.Compare>
              ))}
            </S.Col>
          </S.Stats>
        </S.Width>
      </S.Section>
      <CommentSection comment={keywordCommentList[1]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              <S.Day>최근 30일 추세</S.Day>
              <S.Date>{trendData?.[0].date}</S.Date>
              <S.Stat>{trendData?.[0].trend}<S.Scale>{trendData?.[0].unit}</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={1}>
              <S.Day>최근 3개월 추세</S.Day>
              <S.Date>{trendData?.[1].date}</S.Date>
              <S.Stat>{trendData?.[1].trend}<S.Scale>{trendData?.[1].unit}</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={2}>
              <S.Day>최근 6개월 추세</S.Day>
              <S.Date>{trendData?.[2].date}</S.Date>
              <S.Stat>{trendData?.[2].trend}<S.Scale>{trendData?.[2].unit}</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
          </S.Stats>
        </S.Width>
      </S.Section>
      <CommentSection comment={keywordCommentList[2]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              <S.Day>최근 12개월 추세</S.Day>
              <S.Date>{trendData?.[3].date}</S.Date>
              <S.Stat>{trendData?.[3].trend}<S.Scale>{trendData?.[3].unit}</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={1}>
              <S.Day>최근 24개월 추세</S.Day>
              <S.Date>{trendData?.[4].date}</S.Date>
              <S.Stat>{trendData?.[4].trend}<S.Scale>{trendData?.[4].unit}</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={2}>
              <S.Day>전체 추세</S.Day>
              <S.Date>{trendData?.[5].date}</S.Date>
              <S.Stat>{trendData?.[5].trend}<S.Scale>{trendData?.[5].unit}</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
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
  padding-left: 30px;
  padding-bottom: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  ${props => props.index===1 ? 'margin: 0 40px;' : ''}
  ${props => props.isWhite ? 'background: none; box-shadow: none;' : ''}
`;

S.Stats = styled.div`
  display: flex;
  ${props => props.isWhite ? 'margin-top: 40px;' : ''}
`;

S.Day = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  //justify-content: center;
  margin: 40px 0 20px 0;
  color: #1d1d1f;
`;

S.Date = styled.div`
  display: flex;
  color: #515154;
  margin-bottom: 40px;
  ${props => props.isWhite ? 'color: white;' : ''}
  //justify-content: center;
  font-size: 14px;
`;

S.Stat = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: 'Montserrat', 'SUIT';
  display: flex;
  align-items: end;
  ${props => props.isWhite ? 'margin: 0;' : ''}
  color: #1d1d1f;
`;

S.Compare = styled.div`
  display: flex;
  color: #515154;
  margin-bottom: 10px;
  align-items: center;
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