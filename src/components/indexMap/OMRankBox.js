import styled from 'styled-components';
import { useFetch } from '@hooks';
import { RANK_OM_URL } from '@api';
import { Line } from 'react-chartjs-2';
import { mapLineOptions } from '@constants';
import { applyStyleToMapChart } from '@functions';
import Loading from '@/components/Loading';
import { useState } from 'react';

export default function OMRankBox({ id, setShowRankBox }){
  const { payload, loading, error } = useFetch(
    RANK_OM_URL + id,
    null,
    'GET',
    [id],
    id
  );

  const [ open, setOpen ] = useState(true);

  return (
    <S.Box open={open} onToggle={e => setOpen(e.target.open)} >
      {
        !loading ?
        <>
          <S.Title>
            <S.Toggle>
              <S.Hide><i class={"fas fa-caret-" + (open ? "right" : "down")}></i></S.Hide>
              {payload?.name}
            </S.Toggle>
            <S.Close onClick={() => setShowRankBox(false)}><i className="fas fa-times"></i></S.Close>
          </S.Title>
          <S.Ratio>상위 {payload?.ratio}%</S.Ratio>
          <S.Rank>{payload?.rank}위</S.Rank>
          <S.Delta>{Math.abs(payload?.delta)}위 {payload?.delta >= 0 ? '상승' : '하락'}</S.Delta>
          <S.Chart>
            {payload && <Line options={mapLineOptions('위', true, true)} data={applyStyleToMapChart(payload?.chart, true)}/>}
          </S.Chart>
          <S.AreaBox>
            {payload?.areaRank.map(rank => (
              <S.Arearank key={rank.name}>
                <S.Area><S.AreaName>{rank.name}</S.AreaName>에서</S.Area>
                <S.Stat>{rank.rank}위</S.Stat>
              </S.Arearank>
            ))}
          </S.AreaBox>
        </> :
        <S.Loading>
          <Loading isWhite />
        </S.Loading>
      }
    </S.Box>
  );
}

const S = {};

S.Toggle = styled.div`
  display: flex;
  &:hover{
    cursor: pointer;
  }
`;

S.Hide = styled.div`
  margin-right: 8px;
  width: 6px;
`;

S.Box = styled.details`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(180%) blur(12px);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 20px 0 20px;
  color: #f5f5f7;
  display: flex;
  flex-flow: column;
`;

S.Title = styled.summary`
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

S.AreaBox = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 10px;
`;

S.Arearank = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 12px;
`;

S.AreaName = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-right: 5px;
`;

S.Area = styled.div`
  display: flex;
  align-items: end;
  font-size: 11px;
`;

S.Stat = styled.div`
  font-family: 'Montserrat', 'SUIT';
`;

S.Loading = styled.div`
  height: 240px;
`;