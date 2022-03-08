/*global kakao*/
import styled from 'styled-components';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopTwentyBox from '@/components/rank/TopTwentyBox';
import MapRankBox from '@/components/rank/MapRankBox';
import { MAP_URL } from '@api';
import { useFetch } from '@hooks';

export default function Rank(){
  const { corpId } = useParams();
  const [ index, setIndex ] = useState(0);
  const [ fold, setFold ] = useState(false);

  const { payload, error } = useFetch(
    MAP_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== '0'
  );

  const container = document.getElementById('map');

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(payload?.corpList?.[index].lat, payload?.corpList?.[index].lng),
      level: 3
    };
    const map = payload ? new kakao.maps.Map(container, options) : null;
    if(!map) return;
    //map.setDraggable(false);
    map.setZoomable(false);
    payload?.corpList?.forEach((corp, i) => {
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
        position: overlayPosition,
        zIndex: 2
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
      });
    });
  }, [index, payload]);

  if(corpId === '0') return (
    <CorpRequired />
  );

  return ( 
    <>
      <S.Map id="map" />
      {
        payload && 
        <>
          <TopTwentyBox corpList={payload?.corpList} setIndex={setIndex} setFold={setFold} />
          <MapRankBox corp={payload?.corpList?.[index]} fold={fold} setFold={setFold} />
        </>
      }
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
