import { useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = 'SUIT';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const data = {
  labels: ['2021.02', '2021.03', '2021.04', '2021.05',' 2021.06', '2021.07', '2021.08', '2021.09', '2021.10', '2021.11', '2021.12', '2022.01'],
  datasets: [
    {
      label: 'PC',
      data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40],
      borderColor: '#0063b2', 
      backgroundColor: '#0063b2'
    },
    {
      label: '모바일',
      data: [90, 80, 70, 60, 50, 60, 70, 80, 90, 80, 70, 60],
      borderColor: '#9cc3d5',
      backgroundColor: '#9cc3d5'
    },
  ]
};

export default function UserStat({ userRef }){
  const [ tab, setTab ] = useState(0);
  return (
    <S.Section color={'#f5f5f7'} ref={userRef} id="user-stat">
        <S.Box>
          <S.BoxTitle>검색자 특성</S.BoxTitle>
          <S.Comment>검색자들이 이용하는 키워드 유형과 연령, 성별에 따라 기기의 비중이 달라집니다.</S.Comment>
          <S.Tabs>
            <S.Tab onClick={() => setTab(0)} isSelected={tab===0}>기기별</S.Tab>
            <S.Tab onClick={() => setTab(1)} isSelected={tab===1}>성별</S.Tab>
            <S.Tab onClick={() => setTab(2)} isSelected={tab===2}>요일별</S.Tab>
            <S.Tab onClick={() => setTab(3)} isSelected={tab===3}>월별</S.Tab>
            <S.Tab onClick={() => setTab(4)} isSelected={tab===4}>연령별</S.Tab>
          </S.Tabs>
          <S.Chart>
            <Line options={options} data={data} />
          </S.Chart>
          <S.Stats>
            <S.Stat>
              <S.Title>최근 30일 모바일 비율</S.Title>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Data>85%</S.Data>
            </S.Stat>
            <S.Stat>
              <S.Title>최근 3개월 모바일 비율</S.Title>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Data>85%</S.Data>
            </S.Stat>
            <S.Stat>
              <S.Title>최근 6개월 모바일 비율</S.Title>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Data>85%</S.Data>
            </S.Stat>
            <S.Stat last={true}>
              <S.Title>전체 모바일 비율</S.Title>
              <S.Date>2022.01.22(토) ~ 2022.02.21(월)</S.Date>
              <S.Data>85%</S.Data>
            </S.Stat>
          </S.Stats> 
        </S.Box>
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

S.Box = styled.div`
  width: 60%;
  max-width: 1200px;
  background: white;
  margin: 40px 0;
  display: flex;
  flex-flow: column;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

S.BoxTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
`;

S.Tabs = styled.div`
  display: flex;
  margin-top: 40px;
`;

S.Tab = styled.div`
  padding: 15px 10px;
  margin: 0 10px;
  color: #1d1d1f;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    opacity: 1;
    cursor: pointer;
    font-weight: bold;
  }
  ${props => props.isSelected ? 'opacity: 1; border-bottom: 1px solid #1d1d1f; font-weight: bold;' : ''}
`;

S.Comment = styled.div`
  color: #7f7f7f;
  margin: 10px 0;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Chart = styled.div`
  margin-top: 50px;
  width: 85%;
  padding: 0 100px;
`;

S.Stats = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

S.Stat = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-flow: column;
  ${props => props.last ? '' : 'border-right: 1.5px solid #eaeaea;'}
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

S.Date = styled.div`
  color: #aaaaaa;
  font-size: 14px;
  margin-top: 15px;
`;

S.Data = styled.div`
  margin-top: 30px;
  font-weight: bold;
  font-size: 32px;
  font-family: 'Montserrat';
`;