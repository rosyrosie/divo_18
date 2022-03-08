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
          <S.Scales>
            <S.Scale isSelected>30일</S.Scale>
            <S.Scale>3개월</S.Scale>
            <S.Scale>6개월</S.Scale>
            <S.Scale>1년</S.Scale>
            <S.Scale>전체</S.Scale>
          </S.Scales>
          <S.Chart>
            <Line options={lineOptions('건')} data={lineData[1]} />
          </S.Chart>
          <S.SubTitle>마케팅 효율 지표</S.SubTitle>
          <S.Stats>
            <S.Stat>
              <S.StatName>
                View 순위
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>3위</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                View EPR
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>34,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                View LPR
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>44,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                View CPR
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>??</S.Index>
            </S.Stat>
          </S.Stats>
          <S.Stats>
            <S.Stat>
              <S.StatName>
                Place 순위
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>3위</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                Place EPR
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>34,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                Place LPR
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>44,230원</S.Index>
            </S.Stat>
            <S.Stat>
              <S.StatName>
                Place CPR
                <S.Help><i className="far fa-question-circle"></i></S.Help>
              </S.StatName>
              <S.Index>??</S.Index>
            </S.Stat>
          </S.Stats>
        </S.Main>
        <S.Sidebar>
          <S.List>
            도레미파솔~
          </S.List>
        </S.Sidebar>
      </S.Body>
    </S.View>
  );
}

const S = {};

S.View = styled.div`
  flex: 1;
  background: #f5f5f7;
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
  margin-top: 40px;
  color: #515154;
  padding-right: 20px;
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
  margin-left: 20px;
  padding: 20px;
  display: flex;
  flex-flow: column;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
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
  position: relative;
`;

S.Help = styled.div`
  margin-left: 5px;
`;

S.Index = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;