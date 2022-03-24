import styled from 'styled-components';
import { useFetch } from '@hooks';
import { RANK_OM_URL } from '@api';
import { Line } from 'react-chartjs-2';
import { mapLineOptions } from '@constants';
import { applyStyleToMapChart } from '@functions';

export default function OMRankBox({ id, setShowRankBox }){
  const { payload, error } = useFetch(
    RANK_OM_URL + id,
    null,
    'GET',
    [id],
    id
  );

  return (
    <S.Box>
      <S.Title>
        {payload?.name}
        <S.Close onClick={() => setShowRankBox(false)}><i className="fas fa-times"></i></S.Close>
      </S.Title>
      <S.Ratio>상위 {payload?.ratio}%</S.Ratio>
      <S.Rank>{payload?.rank}위</S.Rank>
      <S.Delta>{Math.abs(payload?.delta)}위 {payload?.delta >= 0 ? '상승' : '하락'}</S.Delta>
      <S.Chart>
        {payload && <Line options={mapLineOptions('위', true, true)} data={applyStyleToMapChart(payload?.chart, true)}/>}
      </S.Chart>
    </S.Box>
  );
}

const S = {};

S.Box = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(180%) blur(12px);
  border-radius: 10px;
  top: 68px;
  right: 20px;
  width: 240px;
  color: #f5f5f7;
  padding: 20px;
  display: flex;
  flex-flow: column;
`;

S.Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

S.Close = styled.div`
  &:hover{
    cursor: pointer;
  }
`;

S.Ratio = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 12px;
`;

S.Rank = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Montserrat', 'SUIT';
  margin-top: 10px;
`;

S.Delta = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 12px;
`;

S.Chart = styled.div`
  margin-top: 20px;
`;