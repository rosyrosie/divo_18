import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';
import { applyStyleToChart } from '@functions';
import { radarOptions } from '@constants';

export default function SalesRadar({ radarRef, radarData }){
  return (
    <S.Fill id="sales-radar" ref={radarRef}>
      <S.Width>
        <S.Text>
          <S.Title>매출 지표 분석</S.Title>
          <S.Comment>매출액은 자기 점포의 매출액 수준을 다른 점포들과 비교하여 판단할 수 있도록 지수화한 지표입니다.</S.Comment>
          <S.Comment>주말 매출 비중은 자기 점포 매출액의 주말 비중이 어떤 수준인지, 다른 점포와 비교하여 판단하기 위한 지표입니다.</S.Comment>
          <S.Comment>결제단가(테이블단가, 1회 결제금액)은 자기 점포 결제단가 수준을 상대적으로 판단할 수 있도록 지수화한 지표입니다.</S.Comment>
          <S.Comment>결제건수는 자기 점포 결제건수 수준을 다른 점포들과 비교할 때 어떤 수준인지 판단할 수 있도록 지수화한 지표입니다.</S.Comment>
          <S.Comment>저녁 매출 비중은 자기 점포 매출액의 저녁 비중이 어떤 수준인지, 다른 점포와 비교하여 판단하기 위한 지표입니다.</S.Comment>
          <S.Comment>재방문 매출 비율은 자기 점포의 재방문 고객 수준을 다른 점포들과 비교하여 판단할 수 있도록 지수화한 지표입니다.</S.Comment>
        </S.Text>
        <S.Radar>
          {radarData && <Radar options={radarOptions('', false)} data={applyStyleToChart(radarData, 'light')} />}
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
  font-size: 14px;
`;