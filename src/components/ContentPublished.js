import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SA_CONTENT_URL } from '../environments/Api';
import { useFetch } from '../environments/Hooks';

export default function ContentPublished({ ctRef }){

  const { keyword } = useParams();

  const { payload, error } = useFetch(
    SA_CONTENT_URL + keyword,
    null,
    'GET',
    []
  );

  const data = payload?.contents;

  return (
    <S.Section color={'#2a3142'} isWhite={true} ref={ctRef} id="ctn-published">
      <S.Width>
        <S.Title>컨텐츠 발행량</S.Title>
        <S.Comment isWhite={true}>점포의 매출액 상승을 위해서는 고객의 자발적 컨텐츠 발행이 늘어나야 합니다.</S.Comment> 
        <S.Comment isWhite={true}>경영자가 적극적으로 블로그 활동을 함으로써 타인이 블로그에 쓸 수 있는 컨텐츠를 전파해야 하며,</S.Comment>
        <S.Comment isWhite={true}>필요한 경우 체험단을 활용함으로써 지속적인 브랜드 인지도를 높이는 바이럴 활동을 해야 합니다.</S.Comment>
        <S.Stats isWhite={true}>
          <S.Col index={0} isWhite={true}>
            <S.Day>최근 1일 발행량</S.Day>
            <S.Date isWhite={true}>{data?.[0]?.date}</S.Date>
            <S.Stat isWhite={true}>{data?.[0]?.contentsTotal}</S.Stat>
          </S.Col>
          <S.Col index={1} isWhite={true}>
            <S.Day>최근 30일 발행량</S.Day>
            <S.Date isWhite={true}>{data?.[1]?.date}</S.Date>
            <S.Stat isWhite={true}>{data?.[1]?.contentsTotal}</S.Stat>
          </S.Col>
          <S.Col index={2} isWhite={true}>
            <S.Day>전체 발행량</S.Day>
            <S.Date isWhite={true}>{data?.[2]?.date}</S.Date>
            <S.Stat isWhite={true}>{data?.[2]?.contentsTotal}</S.Stat>
          </S.Col>
        </S.Stats>
      </S.Width>
    </S.Section>
  );
}

const S = {};

S.Section = styled.div`
  width: 100%;
  ${props => `background: ${props.color};`}
  display: flex;
  justify-content: center;
  ${props => props.isWhite ? 'color: #f5f5f7;' : ''}
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  flex-flow: column;
  padding: 50px 0;
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.Comment = styled.div`
  margin: 10px 0;
  color: #f5f5f7;
`;

S.Col = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  padding-left: 30px;
  padding-bottom: 30px;
  ${props => props.index===1 ? 'margin: 0 40px;' : ''}
  ${props => props.index===2 ? '' : 'border-right: 1px solid rgba(255, 255, 255, 0.2);'}
`;

S.Stats = styled.div`
  display: flex;
  margin-top: 40px;
`;

S.Day = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  //justify-content: center;
  margin: 40px 0 20px 0;
`;

S.Date = styled.div`
  display: flex;
  margin-bottom: 40px;
  color: #f5f5f7;
`;

S.Stat = styled.div`
  font-size: 48px;
  font-weight: bold;
  font-family: 'Montserrat';
  display: flex;
  align-items: end;
`;