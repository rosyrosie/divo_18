/*global kakao*/
import styled from 'styled-components';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RANK_GET_PID_URL, RANK_OM_URL, RANK_RIVALS_URL, RANK_QUERY_URL } from '@api';
import { useFetch } from '@hooks';
import MapRankBox from '@/components/rank/MapRankBox';
import QueryBox from '@/components/rank/QueryBox';
import Loading from '@/components/Loading';

export default function Rank(){
  const { corpId } = useParams();
  const [ selectedIndex, setSelectedIndex ] = useState(-1);
  const [ hoverIndex, setHoverIndex ] = useState(-1);
  const [ level, setLevel ] = useState(null);
  const [ mapPosition, setMapPosition ] = useState(null);
  const [ map, configMap ] = useState(null);

  const [ hide, setHide ] = useState(false);
  const [ input, setInput ] = useState('');
  const [ keyword, setKeyword ] = useState('');
  const [ queryList, setQueryList ] = useState(null);
  const [ overlayList, setOverlayList ] = useState([]);
  const [ selectedCorp, setSelectedCorp ] = useState(undefined);
  const [ showSelected, setShowSelected ] = useState(false);
  const [ type, setType ] = useState('query');
  const [ around, setAround ] = useState(null);
  const [ category, setCategory ] = useState(null);

  const { payload: queryResult, loading: queryLoading, error: queryError } = useFetch(
    RANK_QUERY_URL,
    {
      query: keyword,
      corpId: corpId,
      around: around,
      category: category,
      type: type,
      start: 1,
      display: 20
    },
    'POST',
    [keyword, around, category, type],
    keyword || (around !== null || category !== null || type === 'best')
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
    [myId],
    myPlaceId !== undefined && myPlaceId
  );

  const { payload: viewCorp, loading: viewLoading, error: viewCorpError } = useFetch(
    RANK_OM_URL + selectedCorp,
    null,
    'GET',
    [selectedCorp],
    selectedCorp !== undefined
  );

  useEffect(() => {
    setMapPosition({ lat: myCorp?.lat, lng: myCorp?.lng });
    setLevel(3);
    setSelectedCorp(myCorp?.id);
    setShowSelected(true);
    setHide(false);
  }, [myCorp]);

  useEffect(() => {
    if(queryResult){
      setQueryList(queryResult?.data.data);
      setMapPosition({lat: queryResult?.data.lat || myCorp?.lat, lng: queryResult?.data.lng || myCorp?.lng });
      setLevel(queryResult?.data.zoom);
    }
  }, [queryResult]);

  const container = document.getElementById('map');

  useEffect(() => {
    if(container) container.innerHTML = "";
    const options = {
      center: new kakao.maps.LatLng(mapPosition?.lat, mapPosition?.lng),
      level: level
    };
    configMap(mapPosition&&level ? new kakao.maps.Map(container, options) : null);
  }, [mapPosition, level]);

  useEffect(() => {
    if(!map) return;
    var markerPosition = new kakao.maps.LatLng(myCorp?.lat, myCorp?.lng);
    var markerContent =  `<style>#marker_my::after{ content: '★'; font-weight: bold; background: white; color: #4c4c4c; transform: rotate(45deg); width: 28px; height: 28px; margin: 6px 0 0 6px; position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;} #marker_my:hover{cursor: pointer;}</style>` + 
                          `<div id="marker_my" class="marker" style="width: 40px; height: 40px; border-radius: 50% 50% 50% 0; background: #4c4c4c; transform: rotate(-45deg);"></div>`;
    var marker = new kakao.maps.CustomOverlay({
      content: markerContent,
      position: markerPosition,
      zIndex: 1,
      clickable: true,
      yAnchor: 1.1
    });
    marker.setMap(map);

    const myMarker = document.querySelector('#marker_my');
    myMarker?.addEventListener('click', () => {
      setSelectedCorp(myCorp?.id);
      setShowSelected(true);
      setHide(false);
      setSelectedIndex(-1);
    });

    var overlayContent = `<div>` + 
      `<div style="padding: 8px 10px; color: #f5f5f7; border-radius: 10px; font-size: 12px; font-weight: bold; background: #4c4c4c; border: 1px solid #4c4c4c; box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);">${myCorp?.name}</div>` + 
        `<div style="height: 10px; width: 10px; background: #4c4c4c; color: #f5f5f7; border-right: 1px solid #4c4c4c; border-bottom: 1px solid #4c4c4c; margin: 0 auto; transform: translateY(-5px) rotate(45deg); box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);"></div>` + 
      `</div>`;
    var overlayPosition = new kakao.maps.LatLng(myCorp?.lat, myCorp?.lng);
    var overlay = new kakao.maps.CustomOverlay({
      content: overlayContent,
      position: overlayPosition,
      zIndex: 2,
      yAnchor: 2.1
    });
    overlay.setMap(map);

    queryList?.forEach((corp, i) => {
      var markerPosition = new kakao.maps.LatLng(corp?.lat, corp?.lng);
      var markerContent =  `<style>#marker_${i}::after{ content: '${i+1}'; font-weight: bold; background: white; color: #1d1d1f; transform: rotate(45deg); width: 28px; height: 28px; margin: 6px 0 0 6px; position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;} #marker_${i}:hover{cursor: pointer;}</style>` + 
                            `<div id="marker_${i}" class="marker" style="width: 40px; height: 40px; border-radius: 50% 50% 50% 0; background: #4c4c4c; transform: rotate(-45deg); box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);"></div>`;
      var marker = new kakao.maps.CustomOverlay({
        content: markerContent,
        position: markerPosition,
        zIndex: 1,
        clickable: true,
        yAnchor: 1.1
      });
      marker.setMap(map);
    });

    let overlays = [];

    queryList?.forEach((corp, i) => {
      var overlayContent = `<div>` + 
                              `<div style="padding: 8px 10px; color: #1d1d1f; border-radius: 10px; font-size: 12px; font-weight: bold; background: white; border: 1px solid #d2d2d7; box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);">${corp.name}</div>` + 
                              `<div style="height: 10px; width: 10px; background: white; border-right: 1px solid #d2d2d7; border-bottom: 1px solid #d2d2d7; margin: 0 auto; transform: translateY(-5px) rotate(45deg); box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);"></div>` + 
                            `</div>`;
      var overlayPosition = new kakao.maps.LatLng(corp?.lat, corp?.lng);
      var overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        position: overlayPosition,
        zIndex: 2,
        yAnchor: 2.1
      });
      overlays.push(overlay);
      const marker = document.querySelector('#marker_'+i);
      marker?.addEventListener('click', () => {
        setSelectedIndex(i);
        setSelectedCorp(queryList[i].id);
        setShowSelected(true);
        setHide(false);
      });
      marker?.addEventListener('mouseenter', () => {
        setHoverIndex(i);
      });
      marker?.addEventListener('mouseout', () => {
        setHoverIndex(-1);
      });

      kakao.maps.event.addListener(map, 'bounds_changed', () => 
        {
          const markers = document.querySelectorAll('#marker_'+i);
          const marker = markers[markers.length - 1];
          marker?.addEventListener('click', () => {
            setSelectedIndex(i);
            setSelectedCorp(queryList[i].id);
            setShowSelected(true);
            setHide(false);
          });
          marker?.addEventListener('mouseenter', () => {
            setHoverIndex(i);
          });
          marker?.addEventListener('mouseout', () => {
            setHoverIndex(-1);
          });
        }
      );
    });

    setOverlayList(overlays);

    return () => {
      const markers = document.querySelectorAll('div.marker');
      for(var i=0; markers[i]; i++){
        markers[i].remove();
      }
      for(i=0; overlays[i]; i++) overlays[i].setMap(null);
    }
  }, [map, queryList]);

  useEffect(() => {
    for(var i=0; i<overlayList.length; i++){
      if(i === selectedIndex || i === hoverIndex) overlayList[i].setMap(map);
      else overlayList[i].setMap(null);
    }
  }, [overlayList, hoverIndex, selectedIndex]);

  const onClickSearch = () => {
    setSelectedIndex(-1);
    setHoverIndex(-1);
    setType('query');
    setKeyword(input);
    setShowSelected(false);
  }

  if(corpId === '0') return (
    <CorpRequired />
  );

  const getMyCorp = () => {
    setMapPosition({ lat: myCorp?.lat, lng: myCorp?.lng });
    setLevel(3);
    setSelectedCorp(myCorp?.id);
    setShowSelected(true);
    setHide(false);
    setQueryList(null);
    setInput('');
    setKeyword('');
  };

  const getTop = (isNear, sameCat = false) => {
    if(!isNear){
      setType('best');
    }
    else{
      if(sameCat){
        setType('common');
        setCategory(0);
        setAround([map.getCenter().getLat(), map.getCenter().getLng()]);
      }
      else{
        setType('around');
        setAround([map.getCenter().getLat(), map.getCenter().getLng()]);
      }
    }
    setSelectedIndex(-1);
    setShowSelected(false);
    setInput('');
  }

  const moveToCorp = (i, corp) => {
    setHide(false);
    setSelectedIndex(i);
    setSelectedCorp(corp.id);
    setShowSelected(true);
    const bounds = map.getBounds();
    if(corp.lat >= bounds.qa && corp.lat <= bounds.pa && corp.lng >= bounds.ha && corp.lng <= bounds.oa) return;
    setMapPosition({lat: corp.lat, lng: corp.lng});
  }

  return ( 
    <>
      <S.Map id="map" />
      {(queryList || (queryLoading && keyword) || (selectedCorp === myCorp?.id && showSelected)) &&
        <>
          {
            !hide &&
            <S.Sidebar>
              {
                showSelected ?
                <MapRankBox corp={viewCorp} setShowSelected={setShowSelected} setSelectedIndex={setSelectedIndex} loading={viewLoading} />
                :
                <S.Scroll onMouseLeave={() => setHoverIndex(-1)}>
                  {queryLoading ? 
                    <S.Center><Loading /></S.Center> : 
                    queryList.length ? queryList?.map((corp, i) => (
                      <S.ResultBox onClick={() => moveToCorp(i, corp)} onMouseEnter={() => setHoverIndex(i)}>
                        <S.NameBox>
                          <S.Name>{corp.name}</S.Name>
                          <S.Rank>{corp.rank}{corp.rank !== '순위권 밖' && '위'}</S.Rank>
                        </S.NameBox>
                        <S.Addr>{corp.address}</S.Addr>
                      </S.ResultBox>
                    )) : <S.Center>검색결과가 없습니다</S.Center>
                  }
                </S.Scroll>
              }
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
            <S.Input placeholder="음식점 검색" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && onClickSearch()} />
            {keyword && <S.Clear onClick={() => {setQueryList(null); setInput(''); setShowSelected(false); setKeyword(''); setSelectedIndex(-1); setHoverIndex(-1);}}><i className="fas fa-times"></i></S.Clear>}
            <S.Icon onClick={onClickSearch}>
              <i className="fas fa-search"></i>
            </S.Icon>
          </S.SearchBar>
        }
        <S.Button onClick={getMyCorp}>내 매장</S.Button>
        <S.Button onClick={() => getTop(false)}>전국 Top 20</S.Button>
        <S.Button>
          주변 Top 20
          <S.DropBox>
            <S.Dropdown>
              <S.Menu border onClick={() => getTop(true, false)}>전체 업종</S.Menu>
              <S.Menu onClick={() => getTop(true, true)}>내 업종</S.Menu>
            </S.Dropdown>
          </S.DropBox>
        </S.Button>
      </S.Flex>
      {
        (showSelected && queryList?.length) &&
        <QueryBox queryList={queryList} keyword={keyword} setHoverIndex={setHoverIndex} moveToCorp={moveToCorp} />
      }
    </>
  );
}

const S = {};

S.Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

S.Clear = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  color: #515154;
  &:hover{
    cursor: pointer;
  }
`;

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
  z-index: 3;
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