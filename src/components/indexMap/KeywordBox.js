import styled from 'styled-components';
import { useFetch } from '@hooks';
import { RANK_OM_URL } from '@api';
import { Line } from 'react-chartjs-2';
import { mapLineOptions, mapLineData } from '@constants';
import { applyStyleToMapChart } from '@functions';

export default function KeywordBox({ keyword, setShowKwBox }){
  return (
    <S.Box>
      <S.Title>
        {keyword}
        <S.Close onClick={() => setShowKwBox(false)}><i className="fas fa-times"></i></S.Close>
      </S.Title>
      <S.StatBox>
        <details open>
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-caret-right"></i></S.Marker>검색량</S.StatName>
            <S.StatNum>14,230건</S.StatNum>
          </S.Stat>
          <S.Chart>
            <Line options={mapLineOptions('건', false, true)} data={applyStyleToMapChart(mapLineData, true)} />
          </S.Chart> 
        </details>
        <details>
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-caret-right"></i></S.Marker>컨텐츠 발행량</S.StatName>
            <S.StatNum>312건</S.StatNum>
          </S.Stat> 
        </details>
        <details>
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-caret-right"></i></S.Marker>남성 검색 비율</S.StatName>
            <S.StatNum>34.8%</S.StatNum>
          </S.Stat>
          <S.Chart>
            <Line options={mapLineOptions('건', false, true)} data={applyStyleToMapChart(mapLineData, true)} />
          </S.Chart> 
        </details>
        <details>
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-caret-right"></i></S.Marker>PC 검색 비율</S.StatName>
            <S.StatNum>10.1%</S.StatNum>
          </S.Stat>    
          <S.Chart>
            <Line options={mapLineOptions('건', false, true)} data={applyStyleToMapChart(mapLineData, true)} />
          </S.Chart> 
        </details>
      </S.StatBox>                                                                                                                                                                             
    </S.Box>
  );
}

const S = {};

S.Box = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(180%) blur(12px);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
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

S.StatBox = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 30px;
`;

S.Stat = styled.summary`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 10px 0;
`;

S.StatName = styled.div`
  font-weight: 600;
  font-size: 13px;
  display: flex;
`;

S.StatNum = styled.div`
  font-family: 'Montserrat', 'SUIT';
`;

S.Marker = styled.div`
  margin-right: 7px;
`;

S.Chart = styled.div`
`;