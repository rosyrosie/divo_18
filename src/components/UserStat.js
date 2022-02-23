import { useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { barData, barOptions, lineData, lineOptions, userStatComment } from '../environments/Variables';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = 'SUIT';

export default function UserStat({ userRef }){
  const [ tab, setTab ] = useState(0);
  return (
    <S.Section color={'#f5f5f7'} ref={userRef} id="user-stat">
        <S.Box>
          <S.BoxTitle>검색자 특성</S.BoxTitle>
          <S.Comment>{userStatComment[tab]}</S.Comment>
          <S.Tabs>
            <S.Tab onClick={() => setTab(0)} isSelected={tab===0}>기기별</S.Tab>
            <S.Tab onClick={() => setTab(1)} isSelected={tab===1}>성별</S.Tab>
            <S.Tab onClick={() => setTab(2)} isSelected={tab===2}>요일별</S.Tab>
            <S.Tab onClick={() => setTab(3)} isSelected={tab===3}>월별</S.Tab>
            <S.Tab onClick={() => setTab(4)} isSelected={tab===4}>연령별</S.Tab>
          </S.Tabs>
          <S.Chart>
            <Line options={lineOptions} data={lineData[tab]} />
          </S.Chart>
          <S.Chart>
            <Bar options={barOptions} data={barData} />
          </S.Chart>
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
  width: 75%;
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