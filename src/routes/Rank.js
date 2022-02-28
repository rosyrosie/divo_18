/*global kakao*/
import styled from 'styled-components';
import LoginRequired from '@/components/errorPage/LoginRequired';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopTwentyBox from '@/components/rank/TopTwentyBox';
import MapRankBox from '@/components/rank/MapRankBox';
import { mapCorpList } from '@constants';

export default function Rank(){
  const token = localStorage.getItem('token');
  const { corpId } = useParams();
  const [ index, setIndex ] = useState(0);
  const [ fold, setFold ] = useState(false);

  useEffect(() => {
    var container = document.getElementById('map');
    if(!container) return;
    var options = {
      center: new kakao.maps.LatLng(37.36, 127.106),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    map.setDraggable(false);
    map.setZoomable(false);
    mapCorpList.forEach((corp, i) => {
      var markerPosition = new kakao.maps.LatLng(corp.lat, corp.lng);
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true,
      });
      marker.setMap(map);
      var overlayContent = `<div style="padding: 10px; background: #000000b3; border-radius: 10px; color: #f5f5f7; font-size: 12px; backdrop-filter: saturate(180%) blur(20px);">${corp.corpName}</div>`;
      var overlayPosition = new kakao.maps.LatLng(corp.lat+0.00055, corp.lng);
      var overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        position: overlayPosition
      });
      if(i === index) overlay.setMap(map);
      kakao.maps.event.addListener(marker, 'click', () => {
        setIndex(i);
        setFold(false);
        overlay.setMap(map);
      });
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        overlay.setMap(map);
      });
      kakao.maps.event.addListener(marker, 'mouseout', () => {
        if(i !== index) overlay.setMap(null);
      })
    });
  }, [index]);

  if(!token) return (
    <LoginRequired />
  );

  if(corpId === '0') return (
    <CorpRequired />
  );

  return (
    <>
      <S.Map id="map" />
      <TopTwentyBox corpList={mapCorpList} setIndex={setIndex} setFold={setFold} />
      <MapRankBox corp={mapCorpList[index]} fold={fold} setFold={setFold} />
    </>
  );
}

const S = {};

S.Map = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

S.InfoWindow = styled.div`
  border-radius: 20px;
  padding: 20px;
  background: white;
`;
