import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { lineOptions } from '@constants';
import { applyStyleToChart } from '@functions';

export default function RecentSales({ salesRef, recentSalesData }){
  const [ tab, setTab ] = useState(0);
  const pointData = recentSalesData?.point;
  const lineData = recentSalesData?.graph;

  return (
    <S.Fill color={'#f5f5f7'} id="sales-qty" ref={salesRef}>
      <S.Width>
        <S.Text>
          <S.Title>최근 매출 현황</S.Title>
          {pointData?.map((point, i) => (
            <S.LineTab last={i===2} isSelected={tab===i} onClick={() => setTab(i)} key={point.currDate}>
              <S.TabTitle>{point.currDate} 매출액</S.TabTitle>
              <S.Sales>{point.currSales}</S.Sales>
              <S.Compare>
                {!i ? '전주대비' : i===1 ? '전월대비' : '전년대비'}
                <S.Delta>{point.pastSales}</S.Delta>
              </S.Compare>
            </S.LineTab>
          ))}
        </S.Text>
        <S.Line>
          {lineData && <Line options={lineOptions('원', true)} data={applyStyleToChart(lineData[tab], 'light')} />}
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
  //box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.3);
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  padding: 50px 0;
`;

S.Text = styled.div`
  flex: 2;
  display: flex;
  flex-flow: column;
  ${props => props.right && 'align-items: end;'}
`;

S.Line = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  margin-top: 64px;
  background: white;
  margin-left: 40px;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  color: #1d1d1f;
`;

S.LineTab = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-flow: column;
  ${props => props.last && 'border-bottom: 1px solid rgba(0, 0, 0, 0.1);'}
  &:hover{
    cursor: pointer;
    background: rgba(200, 200, 220, 0.3);
  }
  ${props => props.isSelected && 'background: rgba(200, 200, 220, 0.3);'}
`;

S.TabTitle = styled.div`
  font-size: 14px;
  color: #515154;
`;

S.Sales = styled.div`
  margin: 30px 0 15px 0;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Montserrat', 'SUIT';
  color: #1d1d1f;
`;

S.Compare = styled.div`
  display: flex;
  font-size: 12px;
  color: #515154;
`;

S.Delta = styled.div`
  font-family: 'Montserrat', 'SUIT';
  font-weight: 400;
  margin-left: 5px;
  font-weight: 600;
  color: #1d1d1f;
`;