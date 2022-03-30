/*global kakao*/
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IM_DRAW_URL, RANK_SS_URL } from '@api';
import { useFetch } from '@hooks';
import RegionContent from '@/components/indexMap/RegionContent';
import Searchbar from '@/components/indexMap/Searchbar';
import SearchResult from '@/components/indexMap/SearchResult';
import OMRankBox from '@/components/indexMap/OMRankBox';
import KeywordBox from '@/components/indexMap/KeywordBox';
import { changeZoom, getPlaceOverlay } from '@constants';
import { showPopup } from '@functions';

export default function IndexMap(){
  const [ map, showMap ] = useState(null);
  const mapLevel = 12;
  const mapCenter = {
    lat: 36.266826,
    lng: 127.2786567
  };
  const defaultQuery = {
    type: 'region',
    code: 0,
    name: '전국',
  }
  const [ mapRange, setMapRange ] = useState(null);
  const [ overlay, setOverlay ] = useState(new kakao.maps.CustomOverlay({ yAnchor: 1.2 }));
  const [ query, setQuery ] = useState(null);
  const [ trigger, setTrigger ] = useState(true);
  const [ boxList, setBoxList ] = useState([]);
  const [ hide, setHide ] = useState(false);
  const [ queryList, setQueryList ] = useState(null);

  const [ markers, setMarkers ] = useState([]);
  const [ id, setId ] = useState(null);
  const [ placeOverlay, setPlaceOverlay ] = useState(new kakao.maps.CustomOverlay({ yAnchor: 1.25 }));
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

  const { payload: place, error: placeError } = useFetch(
    RANK_SS_URL + id,
    null,
    'GET',
    [id],
    id
  );
  
  const [ input, setInput ] = useState('');
  const [ searchInput, setSearchInput ] = useState('');

  useEffect(() => {
    if(!place) return;
    const content = getPlaceOverlay(place);
    placeOverlay.setPosition(new kakao.maps.LatLng(place.lat, place.lng));
    placeOverlay.setContent(content);
    placeOverlay.setMap(map);
    document.getElementById('close-overlay')?.addEventListener('click', () => { placeOverlay.setMap(null); setId(null); });
    document.getElementById('show-detail')?.addEventListener('click', () => {setBoxList(list => list.some(e => e.id === place.id) ? list : [{type: 'om', id: place.id}, ...list.slice(0, 4)]);});
  }, [place]);

  useEffect(() => {
    let handlers = [];
    for(const marker of markers){
      if(id === marker.id) continue;
      let handler = () => showPopup(map, marker.popup, marker.marker);
      kakao.maps.event.addListener(marker.marker, 'mouseover', handler);
      handlers[marker.id] = handler;
    }
    return () => {
      for(const marker of markers){
        kakao.maps.event.removeListener(marker.marker, 'mouseover', handlers[marker.id]);
      }
    }
  }, [markers, id]);

  const clearState = () => {
    setId(null);
    polygon.setMap(null);
    tempPolygon.setMap(null);
    placeOverlay.setMap(null);
    for(const marker of markers){
      marker.marker.setMap(null);
    }
    setQuery(null);
  }

  useEffect(() => {
    setHide(false);
    setId(null);
    polygon.setMap(null);
    tempPolygon.setMap(null);
    placeOverlay.setMap(null);
    for(const marker of markers){
      marker.marker.setMap(null);
    }
  }, [query]);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
      level: mapRange?.level || mapLevel
    };
    if(mapContainer){
      mapContainer.innerHTML = "";
      showMap(new kakao.maps.Map(mapContainer, mapOption));
    }
  }, []);

  useEffect(() => {
    if(!map) return;
    setMapRange({
      bounds: map.getBounds(),
      level: map.getLevel()*1
    });
    kakao.maps.event.addListener(map, 'zoom_start', () => {
      setTrigger(false);
    });
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      setTrigger(true);
    });
    kakao.maps.event.addListener(map, 'tilesloaded', () => {
      setMapRange({
        bounds: map.getBounds(),
        level: map.getLevel()*1
      });
    });
  }, [map]);

  const { payload, error } = useFetch(
    IM_DRAW_URL,
    mapRange,
    'POST',
    [mapRange],
    mapRange && trigger
  );

  useEffect(() => {
    if(!map) return;
    let coordinates = [];
    let name = '';
    let regionCode = '';
    let polygons = [];

    const displayArea = (coordinates, name, regionCode, center) => {
      let paths = [];
      let points = [];

      for(var i=0; i<coordinates.length; i++){
        let path = [];
        coordinates[i].forEach(coordinate => {
          let point = {};
          point.x = coordinate[1];
          point.y = coordinate[0];
          points.push(point);
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });
        paths.push(path);
      }    
      
      let polygon = new kakao.maps.Polygon({
        map: map,
        path: paths,
        strokeWeight: 1,
        strokeColor: '#263b4d',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#f5f5f7',
        fillOpacity: 0.4
      });

      kakao.maps.event.addListener(polygon, 'mouseover', e => {
        polygon.setOptions({ strokeWeight: 3, zIndex: 1, fillColor: '#d2d2d7' });
        overlay.setContent(`<div><div style="font-weight: bold; font-size: 14px; padding: 11px; border-radius: 3px; background: white; color: #263b4d; box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);">${name}</div><div style="height: 10px; width: 10px; background: white; margin: 0 auto; transform: translateY(-5px) rotate(45deg); box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);"></div></div>`);
        overlay.setPosition(e.latLng);
        overlay.setMap(map);
        map.setCursor('pointer');
      });

      kakao.maps.event.addListener(polygon, 'mousemove', e => {
        overlay.setPosition(e.latLng);
      })

      kakao.maps.event.addListener(polygon, 'mouseout', () => {
        polygon.setOptions({ strokeWeight: 1, zIndex: 0, fillColor: '#f5f5f7' });
        overlay.setMap(null);
        map.setCursor(null);
      });

      kakao.maps.event.addListener(polygon, 'click', () => {
        setQuery({
          type: 'region',
          code: regionCode,
          name: name
        });
        polygon.setOptions({ fillColor: '#d2d2d7', strokeWeight: 3 });
        map.setLevel(changeZoom(regionCode));
        map.panTo(new kakao.maps.LatLng(center.lat, center.lon));
      });

      polygons.push(polygon);
    };

    if(trigger) payload?.features?.forEach(val => {
      coordinates = val.geometry.coordinates;
      name = val.properties.CTP_KOR_NM;
      if(!name) name = val.properties.SIG_KOR_NM;
      if(!name) name = val.properties.EMD_KOR_NM;
      regionCode = val.properties.CTPRVN_CD;
      if(!regionCode) regionCode = val.properties.SIG_CD;
      if(!regionCode) regionCode = val.properties.EMD_CD;
      displayArea(coordinates, name, regionCode, val.center);
    });

    return () => {
      for(var i=0; i<polygons.length; i++) polygons[i].setMap(null);
      polygons = [];
    };
  }, [payload, trigger]);

  useEffect(() => setQuery(null), [searchInput]);

  return (
    <>
      <S.Map id="map" />
      {
        (query || queryList) && 
        <S.Hide onClick={() => setHide(h => !h)} hide={hide}>
          <i className={"fas fa-caret-" + (hide ? 'right' : 'left')}></i>
        </S.Hide>
      }
      <Searchbar input={input} setInput={setInput} searchInput={searchInput} setSearchInput={setSearchInput} setQuery={setQuery} clearState={clearState} />
      <SearchResult queryList={queryList} setQueryList={setQueryList} clearState={clearState} hide={hide} searchInput={searchInput} setSearchInput={setSearchInput} setInput={setInput} setQuery={setQuery} map={map} placeOverlay={placeOverlay} markers={markers} setMarkers={setMarkers} setId={setId} place={place} setBoxList={setBoxList} polygon={polygon} tempPolygon={tempPolygon} />
      {query?.type==='region' && <RegionContent hide={hide} query={query} setQuery={setQuery} map={map} setBoxList={setBoxList} markers={markers} setMarkers={setMarkers} setId={setId} placeOverlay={placeOverlay} polygon={polygon} tempPolygon={tempPolygon} />}
      <S.RightBar>
        {
          boxList.map((element, i) => (
            element.type === 'kw' ? <KeywordBox keyword={element.id} key={element.id} boxList={boxList} setBoxList={setBoxList} defaultOpen={!i} /> :
            <OMRankBox key={element.id} id={element.id} boxList={boxList} setBoxList={setBoxList} defaultOpen={!i} />
          ))
        }
      </S.RightBar>
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

S.RightBar = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 280px;
  display: flex;
  flex-flow: column;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

S.Hide = styled.div`
  position: absolute;
  top: calc(50% - 24px);
  left: ${props => props.hide ? 0 : '320px'};
  width: 23px;
  height: 48px;
  background: white;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #263b4d;
  &:hover{
    cursor: pointer;
  }
`;