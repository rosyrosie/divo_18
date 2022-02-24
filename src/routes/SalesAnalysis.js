import styled from 'styled-components';
import Header from '../components/Header';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';
import { salesLineData, salesLineOptions, salesRadarData, salesRadarOptions } from '../environments/Variables';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SalesCompare from '../components/SalesCompare';

// ChartJS.register(
//   RadialLinearScale,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Filler,
//   Tooltip,
//   Legend,
// );

export default function SalesAnalysis(){
  const [ tab, setTab ] = useState(0);
  const [ radarRef, radarInView ] = useInView({ threshold: 0.01 });
  const [ salesRef, salesInView] = useInView({ threshold: 0.01 });
  const [ compareRef, compareInView ] = useInView({ threshold: 0.01 });

  const activeTab = () => {
    if(radarInView) return 0;
    else if(salesInView) return 1;
    else if(compareInView) return 2;
    return -1;
  }

  return (
    <S.Body>
      <Header />
      <S.TabBox>
        <S.Tabs>
          <S.Tab isSelected={activeTab()===0}><S.Link href="#sales-radar">매출 지표 분석</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===1}><S.Link href="#sales-qty">최근 매출 현황</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===2}><S.Link href="#compare">점포 특성 분석</S.Link></S.Tab>
        </S.Tabs>
      </S.TabBox>
      <S.Fill id="sales-radar" ref={radarRef}>
        <S.Width>
          <S.Text>
            <S.Title>매출 지표 분석</S.Title>
            <S.Comment>매출액이..</S.Comment>
            <S.Comment>주말 매출 비율이..</S.Comment>
            <S.Comment>저녁 매출 비율이..</S.Comment>
            <S.Comment>결제단가가..</S.Comment>
            <S.Comment>결제건수가..</S.Comment>
            <S.Comment>재방문 매출 비율이..</S.Comment>
          </S.Text>
          <S.Radar>
            <Radar options={salesRadarOptions} data={salesRadarData} />
          </S.Radar>
        </S.Width>
      </S.Fill>
      <S.Fill color={'#f5f5f7'} id="sales-qty" ref={salesRef}>
        <S.Width>
          <S.Text>
            <S.Title>최근 매출 현황</S.Title>
            <S.LineTab isSelected={tab===0} onClick={() => setTab(0)}>
              <S.TabTitle>2022년 2월 22일</S.TabTitle>
              <S.Sales>2,435,000원</S.Sales>
              <S.Compare>
                전주대비
                <S.Delta>+250,000</S.Delta>
              </S.Compare>
            </S.LineTab>
            <S.LineTab isSelected={tab===1} onClick={() => setTab(1)}>
              <S.TabTitle>2022년 2월 3주차</S.TabTitle>
              <S.Sales>12,435,000원</S.Sales>
              <S.Compare>
                전월대비
                <S.Delta>-1,250,000</S.Delta>
              </S.Compare>
            </S.LineTab>
            <S.LineTab last={true} isSelected={tab===2} onClick={() => setTab(2)}>
              <S.TabTitle>2022년 1월</S.TabTitle>
              <S.Sales>52,435,000원</S.Sales>
              <S.Compare>
                전년대비
                <S.Delta>+2,300,000</S.Delta>
              </S.Compare>
            </S.LineTab>
          </S.Text>
          <S.Line>
            <Line options={salesLineOptions} data={salesLineData[tab]} />
          </S.Line>
        </S.Width>
      </S.Fill>
      <SalesCompare compareRef={compareRef} />
    </S.Body>
  );
}

const S = {};

S.Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

S.Body = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1;
`;

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

S.Radar = styled.div`
  flex: 1.2;
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

S.Comment = styled.div`
  margin: 10px 0;
  color: #515154;
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

S.TabBox = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d2d2d7;
  position: sticky;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, 0.72);
  //background: white;
`;

S.Tabs = styled.div`
  width: 60%;
  display: flex;
  font-size: 12px;
  max-width: 1200px;
`;

S.Tab = styled.div`
  padding: 10px 15px;
  color: #1d1d1f;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    opacity: 1;
  }
  ${props => props.isSelected ? 'border-bottom: 1px solid black; opacity: 1;' : ''}
`;
