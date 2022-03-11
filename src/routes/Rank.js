/*global kakao*/
import styled from 'styled-components';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RANK_GET_PID_URL, RANK_OM_URL, RANK_RIVALS_URL, RANK_QUERY_URL } from '@api';
import { useFetch } from '@hooks';

export default function Rank(){
  const { corpId } = useParams();
  const [ index, setIndex ] = useState(0);
  const [ level, setLevel ] = useState(3);
  const [ mapPosition, setMapPosition ] = useState(null);

  const [ hide, setHide ] = useState(false);
  const [ input, setInput ] = useState('');
  const [ keyword, setKeyword ] = useState('');
  const [ queryList, setQueryList ] = useState([]);
  const [ selectedCorp, setSelectedCorp ] = useState(null);
  const [ showSelected, setShowSelected ] = useState(false);

  const { payload: queryResult, error: queryError } = useFetch(
    RANK_QUERY_URL,
    {
      query: keyword,
      corpId: corpId,
      around: null,
      category: null,
    },
    'POST',
    [keyword],
    keyword
  );

  const { payload: myId, error: myIdError } = useFetch(
    RANK_GET_PID_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== '0'
  );

  const myPlaceId = myId?.naverId;

  const { payload: myCorp, error: myCorpError } = useFetch(
    RANK_OM_URL + myPlaceId,
    null,
    'GET',
    [myPlaceId],
    myPlaceId !== undefined
  );

  useEffect(() => {
    setMapPosition({ lat: myCorp?.lat, lng: myCorp?.lng });
    setQueryList([myCorp]);
  }, [myCorp]);

  // useEffect(() => {
  //   if(queryResult){
  //     setQueryList(queryResult?.data.slice(0, 20));
  //   }
  // }, [queryResult]);

  const corpList = queryResult?.data.slice(0, 20);
  const container = document.getElementById('map');

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(mapPosition?.lat, mapPosition?.lng),
      level: level
    };
    const map = mapPosition ? new kakao.maps.Map(container, options) : null;
    if(!map) return;
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      setLevel(map.getLevel());
    })

    queryList?.forEach((corp, i) => {
      var markerPosition = new kakao.maps.LatLng(corp.lat, corp.lng);
      var markerContent =  `<style>#marker_${i}:after{ content: '${i+1}'; font-weight: bold; background: white; color: #1d1d1f; transform: rotate(45deg); width: 28px; height: 28px; margin: 6px 0 0 6px; position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;} #marker_${i}:hover{cursor: pointer;}</style>` + 
                            `<div id="marker_${i}" class="marker" style="width: 40px; height: 40px; border-radius: 50% 50% 50% 0; background: #1d1d1fb3; transform: translateY(-24px) rotate(-45deg); backdrop-filter: saturate(180%) blur(20px);"></div>`;
      var marker = new kakao.maps.CustomOverlay({
        content: markerContent,
        position: markerPosition,
        zIndex: 3
      });
      marker.setMap(map);
    });
    queryList?.forEach((corp, i) => {
      var overlayContent = `<div>` + 
                              `<div style="padding: 8px 10px; color: #1d1d1f; border-radius: 10px; font-size: 12px; font-weight: bold; transform: translateY(-65px); background: white; border: 1px solid #d2d2d7; box-shadow: 1px 1px 1px #d2d2d7; ">${corp.name}</div>` + 
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
  }, [mapPosition]);

  const onClickSearch = () => {
    if(keyword){
      setInput('');
      setKeyword('');
    }
    else{
      setKeyword(input);
    }
  }

  if(corpId === '0') return (
    <CorpRequired />
  );

  return ( 
    <>
      <S.Map id="map" />
      {keyword &&
        <>
          {
            !hide &&
            <S.Sidebar>
              <S.Scroll>
                {corpList?.map((corp, i) => (
                  <S.ResultBox>
                    <S.NameBox>
                      <S.Name>{corp.name}</S.Name>
                      <S.Rank>{corp.rank}{corp.rank !== '순위권 밖' && '위'}</S.Rank>
                    </S.NameBox>
                    <S.Addr>{corp.address}</S.Addr>
                  </S.ResultBox>
                ))}
              </S.Scroll>
            </S.Sidebar>
          }
          <S.Hide hide={hide} onClick={() => setHide(h => !h)}>
            <i className={"fas fa-caret-" + (hide ? 'right' : 'left')}></i>
          </S.Hide>
        </>
      }
      <S.Flex>
        {
          !hide &&
          <S.SearchBar>
            <S.Input placeholder="음식점 검색" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && setKeyword(input)} />
            <S.Icon onClick={onClickSearch}>
              <i className={keyword ? "fas fa-times" : "fas fa-search"}></i>
            </S.Icon>
          </S.SearchBar>
        }
        <S.Button>내 매장</S.Button>
        <S.Button>전국 Top 20</S.Button>
        <S.Button>
          주변 Top 20
          <S.DropBox>
            <S.Dropdown>
              <S.Menu border>전체 업종</S.Menu>
              <S.Menu>내 업종</S.Menu>
            </S.Dropdown>
          </S.DropBox>
        </S.Button>
      </S.Flex>
    </>
  );
}

const S = {};

S.Sidebar = styled.div`
  position: relative;
  width: 320px;
  display: flex;
  flex-flow: column;
  padding: 68px 0 10px 0;
  background: white;
  height: calc(100vh - 48px);
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  color: #1d1d1f;
`;

S.ResultBox = styled.div`
  padding: 20px 15px;
  border-bottom: 1px solid #d2d2d7;
  &:hover{
    cursor: pointer;
  }
`;

S.NameBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

S.Name = styled.div`
  font-weight: bold;
  color: #1d1d1f;
  font-size: 15px;
`;

S.Rank = styled.div`
  color: #515154;
  font-size: 13px;
`;

S.Addr = styled.div`
  margin-top: 30px;
  font-size: 14px;
`;

S.Scroll = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
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
  &:hover{
    cursor: pointer;
  }
`;

S.Flex = styled.div`
  position: absolute;
  display: flex;
  padding: 10px;
  top: 48px;
  left: 0;
`;

S.SearchBar = styled.div`
  display: flex;
  background: white;
  height: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0 rgb(0 0 0 / 2%);
  z-index: 4;
  width: 300px;
  margin-right: 10px;
`;

S.Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  padding: 15px;
  &:focus{
    outline: none;
  }
  color: #1d1d1f;
  &::placeholder{
    color: #515154;
  }
`;

S.DropBox = styled.div`
  position: absolute;
  padding-top: 5px;
  top: 100%;
  width: 100%;
  left: 0;
  display: none;
`;

S.Dropdown = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0 rgb(0 0 0 / 2%);
  width: 100%;
  display: flex;
  flex-flow: column;
`;

S.Button = styled.button`
  background: white;
  border: none;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0 rgb(0 0 0 / 2%);
  margin: 5px 0 5px 10px;
  height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  font-weight: bold;
  color: #1d1d1f;
  position: relative;
  &:hover{
    cursor: pointer;
  }
  &:hover ${S.DropBox}{
    display: flex;
  }
`;

S.Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  border-left: 1px solid #d2d2d7;
  color: #515154;
  &:hover{
    cursor: pointer;
  }
`;

S.Menu = styled.div`
  padding: 15px 0;
  ${props => props.border && 'border-bottom: 1px solid #f5f5f7;'}
  &:hover{
    cursor: pointer;
    background: #f5f5f7;
  }
  font-size: 12px;
  ${props => props.border ? 'border-radius: 8px 8px 0 0;' : 'border-radius: 0 0 8px 8px;'}
`;

S.Map = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;