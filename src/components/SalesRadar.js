import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';
import { salesRadarOptions } from '@/environments/Variables';

export default function SalesRadar({ radarRef, radarData }){
  return (
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
          {radarData && <Radar options={salesRadarOptions} data={radarData} />}
        </S.Radar>
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

S.Radar = styled.div`
  flex: 1.5;
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