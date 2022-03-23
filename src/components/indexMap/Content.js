/*global kakao*/
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { mapLineData, mapLineOptions, sampleQuery } from '@constants';
import { RANK_OM_URL } from '@api';
import { useFetch } from '@hooks';
import { useState, useEffect } from 'react';

export default function Content({ query, map, placeOverlay, setMapCenter }){
  const regionType = (code) => {
    if(code.length === 2) return '시·도 ';
    else if(code.length === 5) return '시·군·구 ';
    else if(code.length === 8) return '읍·면·동 ';
    else return '세부 ';
  }

  const [ id, setId ] = useState(null);
  const [ showChart, setShowChart ] = useState(false);

  const getPlaceOverlay = place => {
    return (
      '<style>' +
        '#close-overlay:hover{' +
          'cursor: pointer;' +
        '}' +
        '#show-detail:hover{' +
          'cursor: pointer;' +
          'text-decoration: underline;' +
        '}' +
      '</style>' +
      '<div style="display: flex; flex-flow: column; min-width: 240px; color: #263b4d; background: rgba(255, 255, 255, 0.5); padding: 20px 15px; box-shadow: 2px 4px 12px rgb(38 59 77 / 30%); border-radius: 5px; backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.18); position: relative;">' +
        '<div style="display: flex; justify-content: space-between; margin-bottom: 15px; align-items: start;">' + 
          '<div style="display: flex; font-weight: bold; align-items: end;">' + 
            place.name +
            `<div style="margin-left: 5px; font-size: 12px; font-weight: normal;">${place.category}</div>` +
          '</div>' +
          '<div style="font-size: 12px; padding: 0 0 5px 5px;" id="close-overlay"><i class="fas fa-times"></i></div>' +
        '</div>' +
        '<div style="font-size: 12px; color: #3166a1; margin-bottom: 5px;">' +
          '블로그 리뷰 ' + place.blogReviewNum + '개' +
        '</div>' +
        '<div style="font-size: 12px; color: #3166a1; margin-bottom: 30px;">' +
          '방문자 리뷰 ' + place.visitorReviewNum + '개' +
        '</div>' +
        '<div style="display: flex; justify-content: space-between; align-items: end;">' +
          '<div style="font-family: \'Montserrat\', \'SUIT\'; font-weight: bold; font-size: 18px;">' +
            place.rank + '위' + '<span style="font-size: 14px;">' + '(상위 ' + place.ratio + '%)' + '</span>' +
          '</div>' +
          '<div style="font-size: 12px; color: #3166a1;" id="show-detail">자세히 보기</div>' +
        '</div>' +
      '</div>' +
      `<div style="height: 10px; width: 10px; background: rgba(255, 255, 255, 0.5); margin: 0 auto; transform: translateY(-5px) rotate(45deg); backdrop-filter: blur(12px); border-right: 1px solid rgba(255, 255, 255, 0.18); border-bottom: 1px solid rgba(255, 255, 255, 0.18);"></div>`
    );
  }

  const { payload: place, error } = useFetch(
    RANK_OM_URL + id,
    null,
    'GET',
    [id],
    id
  );

  useEffect(() => {
    if(!place) return;
    const content = getPlaceOverlay(place);
    placeOverlay.setPosition(new kakao.maps.LatLng(place.lat, place.lng));
    placeOverlay.setContent(content);
    placeOverlay.setMap(map);
    document.getElementById('close-overlay')?.addEventListener('click', () => placeOverlay.setMap(null));
    document.getElementById('show-detail')?.addEventListener('click', () => setShowChart(true));
  }, [place]);

  const onClickCorp = place => {
    placeOverlay.setMap(null);
    setId(place.naverId);
    map.panTo(new kakao.maps.LatLng(place.lat, place.lng));
  }

  return (
    <>
      <S.Body>
        <S.Title>
          {query.name}
          <S.Type>
            {regionType(query.code)} 상권
          </S.Type>
        </S.Title>
        <S.Box>
          <S.Subtitle>소비자 관심도</S.Subtitle>
          <S.Chart>
            <Line options={mapLineOptions} data={mapLineData} />
          </S.Chart>
          <S.Comment>
            <S.Icon><i className="fas fa-award"></i></S.Icon>
            {regionType(query.code)} 상권 중 소비자 관심도 12위입니다
          </S.Comment>
          <S.Comment>
            <S.Icon><i className="fas fa-dice-d6"></i></S.Icon>
            소비자 관심도가 꾸준히 하락 중입니다
          </S.Comment>
        </S.Box>
        <S.Box>
          <S.Subtitle>주요 상권</S.Subtitle>
          <S.RankBox>
            <S.Blur>
              <S.Rank>1</S.Rank>
              샤로수길
            </S.Blur>
            <S.Blur>
              <S.Rank>2</S.Rank>
              관악구청
            </S.Blur>
            <S.Blur>
              <S.Rank>3</S.Rank>
              봉천사거리
            </S.Blur>
          </S.RankBox>
        </S.Box>
        <S.Box>
          <S.Subtitle>상위 20개 점포</S.Subtitle>
          <S.RankBox>
            {sampleQuery.map((corp, i) => (
              <S.Blur key={corp.naverId} onClick={() => onClickCorp(corp)}>
                <S.Rank>{i+1}</S.Rank>
                {corp.name}
              </S.Blur>
            ))}
          </S.RankBox>
        </S.Box>
      </S.Body>
      {
        showChart && 
        <S.DetailBox>
          <S.DetailTitle>
            {place?.name}
            <S.Close onClick={() => setShowChart(false)}><i className="fas fa-times"></i></S.Close>
          </S.DetailTitle>
          <S.DetailChart>
            <Line options={mapLineOptions} data={mapLineData} />
          </S.DetailChart>
        </S.DetailBox>
      }
    </>
  );
}

const S = {};

S.DetailChart = styled.div`
  padding-top: 20px;
`;

S.DetailTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

S.DetailBox = styled.div`
  position: absolute;
  top: 68px;
  right: 20px;
  width: 240px;
  box-shadow: 2px 4px 12px rgb(38 59 77 / 8%);
  color: #263b4d;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  display: flex;
  flex-flow: column;
`;

S.Close = styled.div`
  font-size: 12px;
  &:hover{
    cursor: pointer;
  }
`;

S.Body = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  padding: 20px;
  color: #263b4d;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: absolute;
  top: 68px;
  left: 20px;
  bottom: 20px;
  width: 320px;
  box-shadow: 2px 4px 12px rgb(38 59 77 / 8%);
  &::-webkit-scrollbar-thumb {
    background-color: rgb(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  overflow-y: auto;
`;

S.Title = styled.div`
  font-weight: bold;
  padding: 20px 0 30px 0;
  font-size: 24px;
`;

S.Type = styled.div`
  color: #3166a1;
  font-weight: normal;
  font-size: 14px;
  margin-top: 10px;
`;

S.Box = styled.div`
  padding: 20px 0;
  display: flex;
  flex-flow: column;
`;

S.Subtitle = styled.div`
  font-weight: 600;
`;

S.Chart = styled.div`
  padding: 20px 10px 20px 0;
`;

S.Comment = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', 'SUIT';
  margin-bottom: 10px;
`;

S.Icon = styled.div`
  margin-right: 7px;
  font-size: 16px;
  width: 16px;
`;

S.Blur = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  padding: 12px;
  margin-top: 10px;
  box-shadow: 2px 4px 12px rgb(38 59 77 / 8%);
  display: flex;
  font-size: 14px;
  opacity: .8;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  transition: .2s;
`;

S.Rank = styled.div`
  font-family: 'Montserrat';
  font-weight: bold;
  width: 24px;
`;

S.RankBox = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
`;