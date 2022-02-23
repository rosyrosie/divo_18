import styled from 'styled-components';
import Header from '../components/Header';
import background from '../images/card_bg.jpg';
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SalesAnalysis(){
  const [ tab, setTab ] = useState(0);
  const [ radarRef, radarInView ] = useInView({ threshold: 0.01 });
  const [ salesRef, salesInView] = useInView({ threshold: 0.01 });

  const activeTab = () => {
    if(radarInView) return 0;
    else if(salesInView) return 1;
    return -1;
  }

  return (
    <S.Body>
      <Header />
      <S.TabBox>
        <S.Tabs>
          <S.Tab isSelected={activeTab()===0}><S.Link href="#sales-radar">매출 지표 분석</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===1}><S.Link href="#sales-qty">최근 매출 현황</S.Link></S.Tab>
          {/* <S.Tab isSelected={activeTab()===3}><S.Link href="#mkt-index">마케팅 지표</S.Link></S.Tab> */}
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
      <S.Fill color={'white'}>
        <S.Width>
          <S.Text>
            <S.Title>점포 특성 분석</S.Title>
            <S.Comment>다양한 매출 지표를 통해 점포 및 방문고객 특성을 도출하여 마케팅 방향성을 제시합니다.</S.Comment>
            <S.CardBox>
              <S.Card color={'red'}>
                <S.Image image={background}></S.Image>
                <S.StatBox></S.StatBox>
              </S.Card>
            </S.CardBox>
          </S.Text>
        </S.Width>
      </S.Fill>
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.Comment = styled.div`
  margin: 10px 0;
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
`;

S.Sales = styled.div`
  margin: 30px 0 15px 0;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Montserrat', 'SUIT';
`;

S.Compare = styled.div`
  display: flex;
  font-size: 12px;
`;

S.Delta = styled.div`
  font-family: 'Montserrat', 'SUIT';
  font-weight: 400;
  margin-left: 5px;
  font-weight: 600;
`;

S.TabBox = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #aaaaaa;
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

S.CardBox = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
`;

S.Card = styled.div`
  background: white;
  display: flex;
  align-items: center;
  width: 70%;
  height: 600px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

S.Image = styled.div`
  flex: 1;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
`;

S.StatBox = styled.div`
  flex: 2;
  background: white;
  height: 100%;
`;