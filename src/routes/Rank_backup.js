/*global kakao*/
import styled from 'styled-components';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopTwentyBox from '@/components/rank/TopTwentyBox';
import MapRankBox from '@/components/rank/MapRankBox';
import { RANK_GET_PID_URL, RANK_OM_URL, RANK_RIVALS_URL } from '@api';
import { useFetch } from '@hooks';

export default function Rank(){
  const { corpId } = useParams();
  const [ index, setIndex ] = useState(0);
  const [ fold, setFold ] = useState(false);
  const [ isCat, setIsCat ] = useState(false);
  const [ level, setLevel ] = useState(3);
  
  const { payload, error } = useFetch(
    RANK_GET_PID_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== '0'
  );

  const placeId = payload?.naverId;

  const { payload: cPayload, error: cError } = useFetch(
    RANK_RIVALS_URL + placeId,
    null,
    'GET',
    [payload],
    placeId !== undefined
  );
  
  const myCorp = cPayload?.myData;
  const corpList = isCat ? [myCorp]?.concat(cPayload?.category) : [myCorp]?.concat(cPayload?.around);

  const indexId = corpList?.[index]?.id;

  const { payload: iPayload, error: iError } = useFetch(
    RANK_OM_URL + indexId,
    null,
    'GET',
    [indexId],
    indexId !== undefined
  );

  const container = document.getElementById('map');

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(corpList?.[index]?.lat, corpList?.[index]?.lng),
      level: level
    };
    const map = cPayload ? new kakao.maps.Map(container, options) : null;
    if(!map) return;
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      setLevel(map.getLevel());
    })

    corpList?.forEach((corp, i) => {
      var markerPosition = new kakao.maps.LatLng(corp.lat, corp.lng);
      var markerContent =  `<style>#marker_${i}:after{ content: '${i ? i : '나'}'; font-weight: bold; background: white; color: #1d1d1f; transform: rotate(45deg); width: 28px; height: 28px; margin: 6px 0 0 6px; position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;} #marker_${i}:hover{cursor: pointer;}</style>` + 
                            `<div id="marker_${i}" class="marker" style="width: 40px; height: 40px; border-radius: 50% 50% 50% 0; background: #1d1d1fb3; transform: translateY(-24px) rotate(-45deg); backdrop-filter: saturate(180%) blur(20px);"></div>`;
      var marker = new kakao.maps.CustomOverlay({
        content: markerContent,
        position: markerPosition,
        zIndex: 3
      });
      if(corp.corpName !== corpList[0].corpName || !i) marker.setMap(map);
    });
    corpList?.forEach((corp, i) => {
      var overlayContent = `<div>` + 
                              `<div style="padding: 8px 10px; color: #1d1d1f; border-radius: 10px; font-size: 12px; font-weight: bold; transform: translateY(-65px); background: white; border: 1px solid #d2d2d7; box-shadow: 1px 1px 1px #d2d2d7; ">${corp.corpName}</div>` + 
                              `<div style="height: 10px; width: 10px; background: white; border-right: 1px solid #d2d2d7; border-bottom: 1px solid #d2d2d7; margin: 0 auto; transform: translateY(-70px) rotate(45deg); box-shadow: 1px 1px 1px #d2d2d7;"></div>` + 
                            `</div>`;
      var overlayPosition = new kakao.maps.LatLng(corp.lat, corp.lng);
      var overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        position: overlayPosition,
        zIndex: 4
      });

      const markers = document.querySelectorAll('#marker_'+i);
      const marker = markers[markers.length - 1];
      marker?.addEventListener('click', () => {
        setIndex(i);
        setFold(false);
        overlay.setMap(map);
      });
      marker?.addEventListener('mouseover', () => {
        overlay.setMap(map);
      });
      marker?.addEventListener('mouseout', () => {
        if(i !== index) overlay.setMap(null);
      });

      if(i === index) overlay.setMap(map);

      kakao.maps.event.addListener(map, 'bounds_changed', () => 
        {
          const markers = document.querySelectorAll('#marker_'+i);
          const marker = markers[markers.length - 1];
          marker?.addEventListener('click', () => {
            setIndex(i);
            setFold(false);
            overlay.setMap(map);
          });
          marker?.addEventListener('mouseover', () => {
            overlay.setMap(map);
          });
          marker?.addEventListener('mouseout', () => {
            if(i !== index) overlay.setMap(null);
          });
        }
      );
    });

    return () => {
      const markers = document.querySelectorAll('div.marker');
      for(var i=0; markers[i]; i++) markers[i].remove();
    }
  }, [index, cPayload, isCat]);

  useEffect(() => {
    setIndex(0);
  }, [isCat]);

  if(corpId === '0') return (
    <CorpRequired />
  );

  return ( 
    <>
      <S.Map id="map" />
      {
        cPayload && 
        <>
          <TopTwentyBox corpList={corpList} setIndex={setIndex} setFold={setFold} isCat={isCat} setIsCat={setIsCat} />
          <MapRankBox corp={iPayload} fold={fold} setFold={setFold} />
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