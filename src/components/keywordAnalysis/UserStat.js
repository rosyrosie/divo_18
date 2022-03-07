import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import { barOptions, lineOptions, userStatComment } from '@constants';
import { KA_CHART_URL } from '@api';
import { useParams } from 'react-router-dom';
import { useFetch } from '@hooks';
import { applyStyleToChart } from '@functions';

export default function UserStat({ userRef, userInView }){
  const [ tab, setTab ] = useState(0);
  const { keyword } = useParams();
  const trigger = useRef(null);

  if(userInView) trigger.current = true;

  const { payload, error } = useFetch(
    KA_CHART_URL + keyword,
    null,
    'GET',
    [keyword, trigger.current],
    trigger.current
  );

  const barData = payload?.bar;
  const lineData = payload?.line;

  return (
    <S.Section color={'#f5f5f7'} ref={userRef} id="user-stat">
      <S.Box>
        <S.BoxTitle>검색자 특성</S.BoxTitle>
        <S.Comment>{userStatComment[tab]}</S.Comment>
        <S.Tabs>
          <S.Tab onClick={() => setTab(0)} isSelected={tab===0}>기기별</S.Tab>
          <S.Tab onClick={() => setTab(1)} isSelected={tab===1}>성별</S.Tab>
          <S.Tab onClick={() => setTab(2)} isSelected={tab===2}>요일별</S.Tab>
          <S.Tab onClick={() => setTab(3)} isSelected={tab===3}>월별</S.Tab>
          <S.Tab onClick={() => setTab(4)} isSelected={tab===4}>연령별</S.Tab>
        </S.Tabs>
        <S.Chart>
          {payload && <Bar options={barOptions('%')} data={applyStyleToChart(barData[tab], 'light')} />}
        </S.Chart>
        <S.Chart>
          {payload && <Line options={lineOptions('%')} data={applyStyleToChart(lineData[tab], 'light')} />}
        </S.Chart>
      </S.Box>
    </S.Section>
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

S.Box = styled.div`
  width: 60%;
  max-width: 1200px;
  background: white;
  margin: 40px 0;
  display: flex;
  flex-flow: column;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  justify-content: center;
  align-items: center;
`;

S.BoxTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
  color: #1d1d1f;
`;

S.Tabs = styled.div`
  display: flex;
  margin-top: 40px;
`;

S.Tab = styled.div`
  padding: 15px 10px;
  margin: 0 10px;
  color: #1d1d1f;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    opacity: 1;
    cursor: pointer;
  }
  ${props => props.isSelected ? 'opacity: 1; border-bottom: 1px solid #1d1d1f; ' : ''}
`;

S.Comment = styled.div`
  color: #515154;
  margin: 10px 0;
`;

S.Chart = styled.div`
  margin-top: 50px;
  width: 75%;
`;

S.Stats = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

S.Stat = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-flow: column;
  ${props => props.last ? '' : 'border-right: 1.5px solid #eaeaea;'}
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

S.Date = styled.div`
  color: #aaaaaa;
  font-size: 14px;
  margin-top: 15px;
`;

S.Data = styled.div`
  margin-top: 30px;
  font-weight: bold;
  font-size: 32px;
  font-family: 'Montserrat';
`;