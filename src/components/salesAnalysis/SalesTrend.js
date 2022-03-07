import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { lineOptions } from '@constants';
import { applyStyleToChart } from '@functions';
import { SA_TREND_URL } from '@api';
import { useFetch } from '@hooks';
import { useParams } from 'react-router-dom';

export default function SalesTrend({ trendRef }){
  const { corpId } = useParams();
  const [ tab, setTab ] = useState(0);
  const tabToScale = ['31d', '13w', '26w', '52w', '24m', 'tot'];

  const { payload, error } = useFetch(
    SA_TREND_URL(corpId) + tabToScale[tab],
    null,
    'GET',
    [tab]
  );

  return (
    <S.Fill color={'white'} id="sales-trend" ref={trendRef}>
      <S.Width>
        <S.Title>매출액 추세</S.Title>
        <S.Comment>
          다양한 기간의 매출액 추세로 내 매장 상태를 진단해보세요.
          <S.Tabs>
            <S.Tab isSelected={tab === 0} onClick={() => setTab(0)}>1개월</S.Tab>
            <S.Tab isSelected={tab === 1} onClick={() => setTab(1)}>3개월</S.Tab>
            <S.Tab isSelected={tab === 2} onClick={() => setTab(2)}>6개월</S.Tab>
            <S.Tab isSelected={tab === 3} onClick={() => setTab(3)}>1년</S.Tab>
            <S.Tab isSelected={tab === 4} onClick={() => setTab(4)}>2년</S.Tab>
            <S.Tab isSelected={tab === 5} onClick={() => setTab(5)} last>전체</S.Tab>
          </S.Tabs>
        </S.Comment>
        <S.Line>
          {payload && <Line options={lineOptions('원', true)} data={applyStyleToChart(payload?.totalGraph, 'trend')} />}
        </S.Line>
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
  flex-flow: column;
`;

S.Comment = styled.div`
  color: #515154;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

S.Line = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 64px;
  background: white;
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  color: #1d1d1f;
`;

S.Tabs = styled.div`
  display: flex;
  justify-content: right;
  color: #515154;
  font-size: 14px;
`;

S.Tab = styled.div`
  padding: 0 10px;
  ${props => !props.last && 'border-right: 1px solid #d2d2d7;'}
  ${props => props.isSelected && 'font-weight: bold;'}
  &:hover{
    font-weight: bold;
    cursor: pointer;
  }
`;