import styled from 'styled-components';
import { useFetch } from '@hooks';
import { RANK_OM_URL } from '@api';
import { Line, Bar } from 'react-chartjs-2';
import { mapLineOptions, mapBarOptions, mapLineData, barData } from '@constants';
import { applyStyleToMapChart } from '@functions';
import { useEffect, useState } from 'react';

export default function KeywordBox({ keyword, setKwBoxList, defaultOpen }){
  const [ open, setOpen ] = useState(defaultOpen);

  const deleteFromList = () => setKwBoxList(list => list.filter(element => element !== keyword));

  useEffect(() => setOpen(defaultOpen), [defaultOpen]);

  return (
    <S.Box>
      <S.Title>
        <S.Toggle onClick={() => setOpen(o => !o)}>
          <S.Hide><i class={"fas fa-caret-" + (open ? "right" : "down")}></i></S.Hide>
          {keyword}
        </S.Toggle>
        <S.Close onClick={deleteFromList}><i className="fas fa-times"></i></S.Close>
      </S.Title>
      {
        open &&
        <S.StatBox>
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-search"></i></S.Marker>검색량</S.StatName>
            <S.StatNum>14,230건</S.StatNum>
          </S.Stat>
          <S.Chart>
            <Line options={mapLineOptions('건', false, true)} data={applyStyleToMapChart(mapLineData, true)} />
          </S.Chart> 
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-edit"></i></S.Marker>컨텐츠 발행량</S.StatName>
            <S.StatNum>312건</S.StatNum>
          </S.Stat> 
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-venus-mars"></i></S.Marker>남성 검색 비율</S.StatName>
            <S.StatNum>34.8%</S.StatNum>
          </S.Stat>
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-laptop"></i></S.Marker>PC 검색 비율</S.StatName>
            <S.StatNum>10.1%</S.StatNum>
          </S.Stat> 
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-user"></i></S.Marker>연령별 검색 비율</S.StatName>
          </S.Stat>
          <S.Chart>
            <Bar options={mapBarOptions('%')} data={barData} />
          </S.Chart> 
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-calendar-day"></i></S.Marker>요일별 검색 비율</S.StatName>
          </S.Stat>
          <S.Chart>
            <Bar options={mapBarOptions('%')} data={barData} />
          </S.Chart> 
          <S.Stat>
            <S.StatName><S.Marker><i className="fas fa-horse"></i></S.Marker>월별 검색 비율</S.StatName>
          </S.Stat>
          <S.Chart>
            <Bar options={mapBarOptions('%')} data={barData} />
          </S.Chart> 
        </S.StatBox>
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

S.Box = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(180%) blur(12px);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 20px 0 20px;
  color: #f5f5f7;
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

S.Stat = styled.div`
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
  width: 15px;
  display: flex;
  justify-content: center;
`;

S.Chart = styled.div`
`;