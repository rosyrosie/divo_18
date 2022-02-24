import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { salesCompareData, salesCompareTitle, salesLineData, whiteLineOptions } from '../environments/Variables';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {  } from '../environments/Variables';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SalesCompare(){

  const [ tab, setTab ] = useState(0);
  const [ chartTab, setChartTab ] = useState(0);

  useEffect(() => setChartTab(0), [tab]);

  return (
    <S.Fill color={'#2a3142'}>
      <S.Width>
        <S.Title>점포 특성 분석</S.Title>
        <S.Comment>다양한 매출 지표를 통해 점포 및 방문고객 특성을 도출하여 마케팅 방향성을 제시합니다.</S.Comment>
        <S.Tabs>
          <S.Tab onClick={() => setTab(0)} isSelected={tab===0}>시간별</S.Tab>
          <S.Tab onClick={() => setTab(1)} isSelected={tab===1}>요일별</S.Tab>
          <S.Tab onClick={() => setTab(2)} isSelected={tab===2}>재방문</S.Tab>
        </S.Tabs>
        <S.Row isTitle={true}>
          <S.Stat isTitle={true}>{salesCompareTitle[tab][0]}</S.Stat>
          <S.Menu></S.Menu>
          <S.Stat isTitle={true}>{salesCompareTitle[tab][1]}</S.Stat>
        </S.Row>
        <S.Row>
          <S.Stat>154만원</S.Stat>
          <S.Menu>매출액</S.Menu>
          <S.Stat>312만원</S.Stat>
        </S.Row>
        <S.Row>
          <S.Stat>4.2만원</S.Stat>
          <S.Menu>결제단가</S.Menu>
          <S.Stat>7.5만원</S.Stat>
        </S.Row>
        <S.Row>
          <S.Stat>31건</S.Stat>
          <S.Menu>결제건수</S.Menu>
          <S.Stat>10건</S.Stat>
        </S.Row>
        <S.Row>
          <S.Stat>10%</S.Stat>
          <S.Menu>재방문자 매출 비율</S.Menu>
          <S.Stat>5%</S.Stat>
        </S.Row>
        <S.Chart>
          <Line options={whiteLineOptions} data={salesCompareData[chartTab]} />
        </S.Chart>
      </S.Width>
    </S.Fill>
  );
}

const S = {};

S.Fill = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;  
  background: ${props => props.color};
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  padding: 50px 0;
  color: #f5f5f7;
  justify-content: center;
  flex-flow: column;
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.Comment = styled.div`
  margin: 10px 0;
`;

S.StatRow = styled.div`
  display: flex;
  width: 100%;
  ${props => props.right ? 'justify-content: right;' : ''}
`;

S.Tabs = styled.div`
  display: flex;
  margin: 40px 0;
  color: #f5f5f7;
  justify-content: center;
`;

S.Tab = styled.div`
  padding: 15px 10px;
  margin: 0 10px;
  color: #f5f5f7;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    opacity: 1;
    cursor: pointer;
    font-weight: bold;
  }
  ${props => props.isSelected ? 'opacity: 1; border-bottom: 1px solid #f5f5f7; font-weight: bold;' : ''}
`;

S.Row = styled.div`
  display: flex;
  ${props => props.isTitle ? 'margin: 40px 0 20px 0;' : 'margin-top: 60px;'}
  align-items: center;
`;

S.Stat = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  font-weight: bold;
  ${props => props.isTitle ? 'font-size: 24px; font-weight: 500;' : 'font-size: 36px;'}
`;

S.Menu = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

S.Chart = styled.div`
  margin-top: 100px;
  padding: 0 15%;
`;