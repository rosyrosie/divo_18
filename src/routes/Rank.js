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
    //map.setZoomable(false);
    payload?.corpList?.forEach((corp, i) => {
      var markerPosition = new kakao.maps.LatLng(corp.lat, corp.lng);
      var markerContent =  `<style>#marker_${i}:after{ content: '${i ? i : '나'}'; font-weight: bold; background: white; color: #1d1d1f; transform: rotate(45deg); width: 28px; height: 28px; margin: 6px 0 0 6px; position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;} #marker_${i}:hover{cursor: pointer;}</style>` + 
                            `<div id="marker_${i}" style="width: 40px; height: 40px; border-radius: 50% 50% 50% 0; background: #1d1d1fb3; transform: translateY(-24px) rotate(-45deg); backdrop-filter: saturate(180%) blur(20px);"></div>`;
      var marker = new kakao.maps.CustomOverlay({
        content: markerContent,
        position: markerPosition,
        zIndex: 3
      });
      marker.setMap(map);

      // var overlayContent = `<div>` + 
      //                         `<div style="padding: 8px 10px; color: #f5f5f7; border-radius: 10px; font-size: 12px; font-weight: bold; transform: translateY(-60px); background: rgb(76, 76, 76); backdrop-filter: saturate(180%) blur(20px);">${corp.corpName}</div>` + 
      //                         `<div style="height: 10px; width: 10px; background: rgb(76, 76, 76); margin: 0 auto; transform: translateY(-65px) rotate(45deg);"></div> ` + 
      //                       `</div>`;
      // var overlayPosition = new kakao.maps.LatLng(corp.lat, corp.lng);
      // var overlay = new kakao.maps.CustomOverlay({
      //   content: overlayContent,
      //   position: overlayPosition,
      //   zIndex: 4
      // });

      // if(i === index) overlay.setMap(map);

      // kakao.maps.event.addListener(marker, 'click', () => {
      //   setIndex(i);
      //   setFold(false);
      //   overlay.setMap(map);
      // });
      // kakao.maps.event.addListener(marker, 'mouseover', () => {
      //   overlay.setMap(map);
      // });
      // kakao.maps.event.addListener(marker, 'mouseout', () => {
      //   if(i !== index) overlay.setMap(null);
      // });
      
      // document.querySelector('#marker_'+i)?.addEventListener('click', () => {
      //   setIndex(i);
      //   setFold(false);
      //   overlay.setMap(map);
      // });
      // document.querySelector('#marker_'+i)?.addEventListener('mouseover', () => {
      //   overlay.setMap(map);
      // });
      // document.querySelector('#marker_'+i)?.addEventListener('mouseout', () => {
      //   if(i !== index) overlay.setMap(null);
      // });
    });
    payload?.corpList?.forEach((corp, i) => {
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
      kakao.maps.event.addListener(map, 'bounds_changed', () => {
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
