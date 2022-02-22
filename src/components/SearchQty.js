import styled from 'styled-components';
import { keywordCommentList } from '../environments/Variables';
import CommentSection from './CommentSection';

export default function SearchQty({ qtyRef }){
  return (
    <div ref={qtyRef} id="search-qty">
      <CommentSection comment={keywordCommentList[0]} />
      <S.Section color={'#f5f5f7'}>
        <S.Width>
          <S.Stats>
            <S.Col index={0}>
              <S.Day>최근 1일 검색량</S.Day>
              <S.Date>2022.02.21(월)</S.Date>
              <S.Stat>1,682</S.Stat>
              <S.Compare>전일 대비<S.Red>+10%</S.Red></S.Compare>
              <S.Compare>전주 대비<S.Blue>-23%</S.Blue></S.Compare>
              <S.Compare>전월 대비<S.Red>+9%</S.Red></S.Compare>
            </S.Col>
            <S.Col index={1}>
              <S.Day>최근 1주일 검색량</S.Day>
              <S.Date>2022.02.15(화) ~ 2022.02.21(월)</S.Date>
              <S.Stat>9,437</S.Stat>
              <S.Compare>전주 대비<S.Red>+7%</S.Red></S.Compare>
              <S.Compare>전월 대비<S.Blue>-10%</S.Blue></S.Compare>
            </S.Col>
            <S.Col index={2}>
              <S.Day>최근 1개월 검색량</S.Day>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Stat>45,120</S.Stat>
              <S.Compare>전월 대비<S.Red>+9%</S.Red></S.Compare>
              <S.Compare>전년 대비<S.Blue>-23%</S.Blue></S.Compare>
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
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Stat>+23.2<S.Scale>/일</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={1}>
              <S.Day>최근 3개월 추세</S.Day>
              <S.Date>2022.02.15(화) ~ 2022.02.21(월)</S.Date>
              <S.Stat>-31<S.Scale>/일</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={2}>
              <S.Day>최근 6개월 추세</S.Day>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Stat>+187.4<S.Scale>/일</S.Scale></S.Stat>
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
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Stat>+23.2<S.Scale>/일</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={1}>
              <S.Day>최근 24개월 추세</S.Day>
              <S.Date>2022.02.15(화) ~ 2022.02.21(월)</S.Date>
              <S.Stat>-31<S.Scale>/일</S.Scale></S.Stat>
              <S.Compare>등급 표시</S.Compare>
            </S.Col>
            <S.Col index={2}>
              <S.Day>전체 추세</S.Day>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Stat>+187.4<S.Scale>/일</S.Scale></S.Stat>
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  ${props => props.index===1 ? 'margin: 0 40px;' : ''}
  ${props => props.isWhite ? 'background: none; box-shadow: none;' : ''}
`;

S.Stats = styled.div`
  display: flex;
  ${props => props.isWhite ? 'margin-top: 40px;' : ''}
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
  color: #aaaaaa;
  margin-bottom: 40px;
  ${props => props.isWhite ? 'color: white;' : ''}
  //justify-content: center;
`;

S.Stat = styled.div`
  display: flex;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: 'Montserrat';
  display: flex;
  align-items: end;
  ${props => props.isWhite ? 'margin: 0;' : ''}
`;

S.Compare = styled.div`
  display: flex;
  color: #aaaaaa;
  margin-bottom: 10px;
`;

S.Blue = styled.div`
  color: #06c;
  font-weight: 900;
  margin-left: 10px;
`;

S.Red = styled.div`
  color: #f60;
  font-weight: 900;
  margin-left: 10px;
`;

S.Scale = styled.div`
  font-family: 'SUIT';
  font-size: 20px;
  padding-bottom: 5px;
  padding-left: 5px;
`;