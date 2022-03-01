import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import { radarData, radarOptions } from '@constants';
import { KA_RADAR_URL } from '@api';
import { useParams } from 'react-router-dom';
import { useFetch } from '@hooks';
import { applyColorToChart } from '@functions';
import Loading from '@/components/Loading';

export default function KeywordRadar({ evalRef }){
  const { keyword } = useParams();
  const { payload, loading, error } = useFetch(
    KA_RADAR_URL + keyword,
    null,
    'GET',
    [keyword]
  );

  return (
    <S.Section id="eval-radar" ref={evalRef} color={'rgba(77, 107, 83, 1)'}>
      <S.Width>
        <S.Flex>
          <S.Title isWhite={true}>"{keyword}" 키워드 평가</S.Title>
          <S.Comment isWhite={true}>일 검색량은 키워드의 검색량 수준을 판단할 수 있도록 지수화한 지표입니다.</S.Comment>
          <S.Comment isWhite={true}>주말 검색비율은 평일과 주말 중 검색자 비중이 어느 쪽에 더 많은지 판단하기 위한 지표입니다.</S.Comment>
          <S.Comment isWhite={true}>MZ 검색비율은 전체 검색자 중 2,30대의 비중을 판단하기 위한 지표입니다.</S.Comment>
          <S.Comment isWhite={true}>여성 검색비율은 전체 검색자 중 여성의 비중이 어느 수준인지 판단하기 위한 지표입니다.</S.Comment>
          <S.Comment isWhite={true}>모바일 검색비율은 전체 검색자 중 모바일로 검색하는 비중이 어느 수준인지 판단하기 위한 지표입니다.</S.Comment>
        </S.Flex>
        <S.Chart>
          {!loading ? <Radar options={radarOptions('', true)} data={applyColorToChart(payload, 'greenRadar')} /> : <Loading isWhite/>}
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
  ${props => props.isWhite ? 'color: #f5f5f7;' : ''}
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
  ${props => props.isWhite ? 'color: #f5f5f7;' : ''}
`;

S.Comment = styled.div`
  color: #7f7f7f;
  margin: 10px 0;
  ${props => props.isWhite ? 'color: #f5f5f7;' : ''}
`;

S.Flex = styled.div`
  display: flex;
  flex-flow: column;
  flex: 2;
`;

S.Chart = styled.div`
  flex: 1.2;
`;

S.Bold = styled.text`
  font-weight: bold;
`;