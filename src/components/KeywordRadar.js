import styled from 'styled-components';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { radarData, radarOptions } from '../environments/Variables';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// ChartJS.defaults.color = 'white';
// ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.2)';

export default function KeywordRadar({ evalRef }){
  return (
    <S.Section ref={evalRef} color={'rgba(94, 113, 106, .7)'}>
      <S.Width>
        <S.Flex>
          <S.Title isWhite={true}>키워드 평가</S.Title>
          <S.Comment isWhite={true}>일 검색량은 ~~</S.Comment>
          <S.Comment isWhite={true}>주말 검색비율은 ~~</S.Comment>
          <S.Comment isWhite={true}>MZ 검색비율은 ~~</S.Comment>
          <S.Comment isWhite={true}>여성 검색비율은 ~~</S.Comment>
          <S.Comment isWhite={true}>모바일 검색비율은 ~~</S.Comment>
        </S.Flex>
        <S.Chart>
          <Radar options={radarOptions} data={radarData} />
        </S.Chart>
      </S.Width>
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

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  padding: 50px 0;
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Comment = styled.div`
  color: #7f7f7f;
  margin: 10px 0;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Flex = styled.div`
  display: flex;
  flex-flow: column;
  flex: 2;
`;

S.Chart = styled.div`
  flex: 1.2;
`;