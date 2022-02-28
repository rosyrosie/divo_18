import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { salesLineData, lineOptions } from '@constants';
import { dateToString, applyColorToChart } from '@functions';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { useFetch } from '@hooks';
import { KA_QTY_CHART_URL } from '@api';
import RangePicker from '@/components/RangePicker';
import { useParams } from 'react-router-dom';

export default function SearchQtyChart(){
  const { keyword } = useParams();
  const [ startDate, setStartDate ] = useState(addDays(new Date(), -14));
  const [ endDate, setEndDate ] = useState(addDays(new Date(), -1));

  const { payload, error } = useFetch(
    KA_QTY_CHART_URL(keyword, dateToString(startDate), dateToString(endDate), 0),
    null,
    'GET',
    [startDate, endDate, keyword]
  );

  const chartData = payload?.chart;
  const trend = payload?.trend;

  return (
    <S.Section color={'white'}>
      <S.Width>
        <S.Title>검색량 상세 조회
          <RangePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        </S.Title>
        <S.Comment>원하는 기간 동안의 검색량을 자유롭게 조회하세요.</S.Comment>
        <S.Chart>
          <S.ChartBox>
            {payload && <Line options={lineOptions('', false)} data={applyColorToChart(chartData, 'light')} />}
          </S.ChartBox>
        </S.Chart>
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
  ${props => props.isWhite ? 'color: white;' : ''}
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
  color: #1d1d1f;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

S.Comment = styled.div`
  color: #515154;
  margin: 10px 0;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Chart = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

S.ChartBox = styled.div`
  width: 80%;
`;