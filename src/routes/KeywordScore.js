import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { lineData, lineOptions } from '@constants';

export default function KeywordScore(){
  const [ scale, setScale ] = useState(0);

  return (
    <S.View>
      <S.Body>
        <S.Main>
          <S.Keyword>
            당산역 맛집
            <S.Type>상권 키워드</S.Type>
          </S.Keyword>
          <S.Flex>
            <S.Badges>
              <S.Badge bg="#de071c">
                <i className="fas fa-blog"></i>
                <S.BadgePop>블로그·카페 마케팅 추천 키워드입니다.</S.BadgePop>
              </S.Badge>
              <S.Badge bg="#06c">
                <i className="fas fa-map-marker-alt"></i>
                <S.BadgePop>Place 마케팅 추천 키워드입니다.</S.BadgePop>
              </S.Badge>
            </S.Badges>
            <S.Scales>
              <S.Scale isSelected>30일</S.Scale>
              <S.Scale>3개월</S.Scale>
              <S.Scale>6개월</S.Scale>
              <S.Scale>1년</S.Scale>
              <S.Scale>전체</S.Scale>
            </S.Scales>
          </S.Flex>
          <S.Chart>
            <Line options={lineOptions('건')} data={lineData[1]} />
          </S.Chart>
          <S.SubTitle>마케팅 효율</S.SubTitle>
          <S.Stats>
            <S.Stat>
              <S.StatName>
                View 순위
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>키워드 검색 시 View 탭에서 내 브랜드 노출 순위입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>3위</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                View EPR
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>View EPR은 해당 키워드에서 View 순위가 1위 상승했을 때 예상되는 매출액 증가량입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>34,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                View LPR
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>View LPR은 해당 키워드에서 View 순위가 1위 하락했을 때 예상되는 매출액 감소량입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>44,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                View CPR
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>View CPR은 해당 키워드에서 View 순위를 1위 상승시키기 위해 필요한 예상 비용입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>??</S.Index>
            </S.Stat>
          </S.Stats>
          <S.Stats>
            <S.Stat>
              <S.StatName>
                Place 순위
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>키워드 검색 시 Place 탭에서 내 브랜드 노출 순위입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>3위</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                Place EPR
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>Place EPR은 해당 키워드에서 Place 순위가 1위 상승했을 때 예상되는 매출액 증가량입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>34,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                Place LPR
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>Place LPR은 해당 키워드에서 Place 순위가 1위 하락했을 때 예상되는 매출액 감소량입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>44,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                Place CPR
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>Place CPR은 해당 키워드에서 Place 순위를 1위 상승시키기 위해 필요한 예상 비용입니다.</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>??</S.Index>
            </S.Stat>
          </S.Stats>
        </S.Main>
        <S.Sidebar>
          <S.List>
            <S.SearchBar>
              <S.Icon><i className="fas fa-search"></i></S.Icon>
              <S.Input placeholder="키워드 검색"/>
            </S.SearchBar>
            <S.KwTypes>
              <S.KwType isSelected>브랜드</S.KwType>
              <S.KwType>상권</S.KwType>
              <S.KwType>업종</S.KwType>
            </S.KwTypes>
            <S.Cell>
              <S.Word>당산오돌</S.Word>
              <S.Badges>
                <S.Badge bg="#de071c">
                  <i className="fas fa-blog"></i>
                </S.Badge>
                <S.Badge bg="#06c">
                  <i className="fas fa-map-marker-alt"></i>
                </S.Badge>
              </S.Badges>
            </S.Cell>
            <S.Cell>
              <S.Word>당산오돌 본점</S.Word>
              <S.Badges>
                <S.Badge bg="#ff964f">
                  <i className="fas fa-blog"></i>
                </S.Badge>
              </S.Badges>
            </S.Cell>
          </S.List>
        </S.Sidebar>
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
  justify-content: space-between;
  align-items: center;
`;

S.Body = styled.div`
  width: 60%;
  max-width: 1200px;
  margin: auto;
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
  margin-top: 40px;
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

S.SubTitle = styled.div`
  color: #1d1d1f;
  font-weight: 600;
  margin-top: 20px;
  font-size: 18px;
`;

S.Stats = styled.div`
  display: flex;
  margin-top: 40px;
`;

S.Stat = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

S.StatName = styled.div`
  color: #515154;
  font-size: 14px;
  display: flex;
`;

S.Index = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

S.Pop = styled.div`
  position: absolute;
  bottom: 25px;
  left: -15px;
  background: #1d1d1f;
  padding: 10px;
  border-radius: 10px;
  color: #f5f5f7;
  width: 250px;
  line-height: 150%;
  display: none;
  font-size: 12px;
`;

S.Help = styled.div`
  margin-left: 5px;
  position: relative;
  &:hover ${S.Pop}{
    display: flex;
  }
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

S.Cell = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

S.Word = styled.div`
  font-weight: bold;
  color: #1d1d1f;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

S.Class = styled.div`
  color: #de071c;
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