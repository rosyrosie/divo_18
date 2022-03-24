/*global kakao*/
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { mapLineData, mapLineOptions } from '@constants';
import { RANK_SS_URL, IM_PL_URL, IM_KW_URL } from '@api';
import { useFetch } from '@hooks';
import { useState, useEffect } from 'react';
import { applyStyleToMapChart } from '@functions';
import OMRankBox from '@/components/indexMap/OMRankBox';
import KeywordBox from '@/components/indexMap/KeywordBox';

export default function Content({ query, map }){
  const [ id, setId ] = useState(null);
  const [ keyword, setKeyword ] = useState('');
  const [ preview, setPreview ] = useState(true);
  const [ showRankBox, setShowRankBox ] = useState(false);
  const [ showKwBox, setShowKwBox ] = useState(false);
  const [ markers, setMarkers ] = useState([]);
  const [ polygon, setPolygon ] = useState(
    new kakao.maps.Polygon({
      strokeWeight: 3,
      strokeColor: '#263b4d',
      strokeOpacity: 1,
      strokeStyle: 'solid',
      fillColor: '#263b4d',
      fillOpacity: 0.4,
      zIndex: 2
    })
  );
  const [ tempPolygon, setTempPolygon ] = useState(
    new kakao.maps.Polygon({
      strokeWeight: 2,
      strokeColor: '#263b4d',
      strokeOpacity: 1,
      strokeStyle: 'solid',
      fillColor: '#263b4d',
      fillOpacity: 0.4,
      zIndex: 1
    })
  );
  const [ placeOverlay, setPlaceOverlay ] = useState(new kakao.maps.CustomOverlay({ yAnchor: 1.25 }));
  
  const { payload: place, error } = useFetch(
    RANK_SS_URL + id,
    null,
    'GET',
    [id],
    id
  );
  
  const { payload: placeList, error: pLError } = useFetch(
    IM_PL_URL + query.code,
    null,
    'GET',
    [query],
    query
  );
  
  const { payload: areaList, error: aError } = useFetch(
    IM_KW_URL + query.code,
    null,
    'GET',
    [query],
    query
  );

  const regionType = (code) => {
    if(code.length === 2) return '시·도 ';
    else if(code.length === 5) return '시·군·구 ';
    else if(code.length === 8) return '읍·면·동 ';
    else return '세부 ';
  }

  const getPlaceOverlay = place => {
    return `
      <style>
        #close-overlay:hover{
          cursor: pointer;
        }
        #show-detail:hover{
          cursor: pointer;
          text-decoration: underline;
        }
      </style>
      <div style="display: flex; flex-flow: column; min-width: 240px; color: #263b4d; background: rgba(255, 255, 255, 0.5); padding: 20px 15px; box-shadow: 2px 4px 12px rgb(38 59 77 / 30%); border-radius: 5px; backdrop-filter: saturate(180%) blur(40px); border: 1px solid rgba(255, 255, 255, 0.18); position: relative;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; align-items: start;">
          <div style="display: flex; font-weight: bold; align-items: end;">
            ${place.name}
            <div style="margin-left: 5px; font-size: 12px; font-weight: normal;">${place.category}</div>
          </div>
          <div style="font-size: 12px; padding: 0 0 5px 5px;" id="close-overlay"><i class="fas fa-times"></i></div>
        </div>
        <div style="font-size: 12px; color: #3166a1; margin-bottom: 5px;">
          블로그 리뷰 ${place.blogReviewNum}개
        </div>
        <div style="font-size: 12px; color: #3166a1; margin-bottom: 30px;">
          방문자 리뷰 ${place.visitorReviewNum}개
        </div>
        <div style="display: flex; justify-content: space-between; align-items: end;">
          <div style="font-family: \'Montserrat\', \'SUIT\'; font-weight: bold; font-size: 18px;">
            ${place.rank}위<span style="font-size: 12px;">(상위 ${place.ratio}%)</span>
          </div>
          <div style="font-size: 12px; color: #3166a1;" id="show-detail"><i class="fas fa-external-link-alt"></i></div>
        </div>
      </div>
      <div style="height: 10px; width: 10px; background: rgba(255, 255, 255, 0.5); margin: 0 auto; transform: translateY(-5px) rotate(45deg); backdrop-filter: blur(12px); border-right: 1px solid rgba(255, 255, 255, 0.18); border-bottom: 1px solid rgba(255, 255, 255, 0.18);"></div>
    `;
  };

  const showPopup = (popup, marker) => {
    popup.open(map, marker);
    let popupElement = document.querySelector('.popup');
    popupElement.parentElement.previousSibling.style.display = "none";
    popupElement.parentElement.parentElement.style.border = 'none';
    popupElement.parentElement.parentElement.style.background = 'unset';
    popupElement.parentElement.style.left = "50%";
    popupElement.parentElement.style.marginLeft = "20px";
    popupElement.parentElement.style.top = "40px";
  };

  const showArea = (polygon, area) => {
    polygon.setMap(null);
    let path = [];
    area.convex.forEach(point => {
      path.push(new kakao.maps.LatLng(point[0], point[1]));
    });
    polygon.setPath(path);
    polygon.setMap(map);
  }

  useEffect(() => {
    polygon.setMap(null);
    tempPolygon.setMap(null);
    placeOverlay.setMap(null);
    for(const marker of markers){
      marker.marker.setMap(null);
    }
    setShowRankBox(false);
    setShowKwBox(false);
  }, [query]);

  useEffect(() => {
    if(!place) return;
    const content = getPlaceOverlay(place);
    placeOverlay.setPosition(new kakao.maps.LatLng(place.lat, place.lng));
    placeOverlay.setContent(content);
    placeOverlay.setMap(map);
    document.getElementById('close-overlay')?.addEventListener('click', () => { placeOverlay.setMap(null); setId(null); });
    document.getElementById('show-detail')?.addEventListener('click', () => setShowRankBox(true));
  }, [place]);

  useEffect(() => {
    if(!placeList) return;
    for(const marker of markers){
      marker.marker.setMap(null);
    }
    let newMarkers = [];
    placeList.placeList.forEach(corp => {
      let marker = new kakao.maps.Marker({ opacity: 1 });
      let popup = new kakao.maps.InfoWindow({});

      marker.setPosition(new kakao.maps.LatLng(corp.lat, corp.lng));
      marker.setMap(map);
      newMarkers.push({ marker, popup, id: corp.id });

      let popupContent = `
        <style>
          .popup{
            display: block;
            color: #263b4d;
            background: white;
            text-align: center;
            padding: 8px;
            border-radius: 5px;
            font-size: 12px;
            font-weight: bold;
            border: 1px solid rgba(38, 59, 77, 0.2);
            box-shadow: 2px 4px 12px rgb(38 59 77 / 50%);
            width: max-content;
          }
        </style>
        <div class="popup">
          ${corp.name}
        </div>
      `;
      popup.setContent(popupContent);
      popup.setPosition(new kakao.maps.LatLng(corp.lat, corp.lng));

      kakao.maps.event.addListener(marker, 'click', () => {
        placeOverlay.setMap(null);
        setId(corp.id);
        map.panTo(new kakao.maps.LatLng(corp.lat, corp.lng));
        marker.setOpacity(1);
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        popup.close();
      });
    });

    setMarkers(newMarkers);
  }, [placeList]);

  useEffect(() => {
    let handlers = [];
    for(const marker of markers){
      if(id === marker.id) continue;
      let handler = () => showPopup(marker.popup, marker.marker);
      kakao.maps.event.addListener(marker.marker, 'mouseover', handler);
      handlers[marker.id] = handler;
    }
    return () => {
      for(const marker of markers){
        kakao.maps.event.removeListener(marker.marker, 'mouseover', handlers[marker.id]);
      }
    }
  }, [markers, id]);

  const onClickCorp = place => {
    placeOverlay.setMap(null);
    setId(place.id);
    map.panTo(new kakao.maps.LatLng(place.lat, place.lng));
  };

  const onMouseOver = id => {
    for(const marker of markers){
      if(id === marker.id){
        showPopup(marker.popup, marker.marker);
        return;
      }
    }
  };

  const onMouseOut = id => {
    for(const marker of markers){
      if(id === marker.id){
        marker.popup.close();
        return;
      }
    }
  };

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
            <Line options={mapLineOptions()} data={mapLineData} />
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
            {areaList?.keywordList.slice(0, 3)?.map((area, index) => (
              <S.Blur key={area.keyword} onClick={() => {showArea(polygon, area); setShowKwBox(true); setKeyword(area.keyword);}} onMouseOver={() => showArea(tempPolygon, area)} onMouseOut={() => tempPolygon.setMap(null)}>
                <S.Rank>{index+1}</S.Rank>
                {area.keyword}
              </S.Blur>
            ))}
          </S.RankBox>
        </S.Box>
        <S.Box>
          <S.CSubtitle onClick={() => setPreview(p => !p)}>
            상위 20개 점포
            <i className={"fas fa-angle-" + (preview ? "down" : "up")}></i>
          </S.CSubtitle>
          <S.RankBox>
            {placeList?.placeList?.slice(0, preview ? 5 : 20).map((corp, i) => (
              <S.Blur key={corp.id} onClick={() => onClickCorp(corp)} onMouseOver={() => onMouseOver(corp.id)} onMouseOut={() => onMouseOut(corp.id)}>
                <S.Rank>{i+1}</S.Rank>
                {corp.name}
              </S.Blur>
            ))}
          </S.RankBox>
        </S.Box>
      </S.Body>
      <S.RightBar>
        {(showRankBox && id) && <OMRankBox id={id} setShowRankBox={setShowRankBox} />}
        {showKwBox && <KeywordBox keyword={keyword} setShowKwBox={setShowKwBox} />}
      </S.RightBar>
    </>
  );
}

const S = {};

S.RightBar = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 280px;
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
  backdrop-filter: saturate(180%) blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: absolute;
  top: 48px;
  left: 0;
  bottom: 0;
  width: 320px;
  box-shadow: 2px 4px 12px rgb(38 59 77 / 20%);
  &::-webkit-scrollbar-thumb {
    background-color: rgb(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
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
  display: flex;
  justify-content: space-between;
`;

S.CSubtitle = styled(S.Subtitle)`
  &:hover{
    cursor: pointer;
  }
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