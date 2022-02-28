/*global kakao*/
import styled from 'styled-components';
import LoginRequired from '@/components/LoginRequired';
import CorpRequired from '@/components/CorpRequired';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Rank(){
  const token = localStorage.getItem('token');
  const { corpId } = useParams();

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.36, 127.106),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(37.36, 127.106);
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }, []);

  if(!token) return (
    <LoginRequired />
  );

  if(corpId === '0') return (
    <CorpRequired />
  );

  return (
    <>
      <S.Map id="map">
      </S.Map>
      <S.Sidebar>
        <S.Leaderboard>
          <S.Box>
            <S.Title>내 주변 상위 20개 점포</S.Title>
          </S.Box>
          <S.MyRankBox>
            <S.MyRank>
              <S.Brand>내 브랜드</S.Brand>
              <S.Stat>1,524위</S.Stat>
            </S.MyRank>
          </S.MyRankBox>
        </S.Leaderboard>
      </S.Sidebar>
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

S.Sidebar = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  bottom: 0;
  width: 15%;
  z-index: 1;
  padding: 20px;
`;

S.Leaderboard = styled.div`
  width: 100%;
  height: 100%;  
  background: #000000b3;
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 20px;
  display: flex;
  flex-flow: column;
  font-size: 14px;
`;

S.Box = styled.div`
  width: 100%;
  padding: 20px;
  color: #f5f5f7;
  display: flex;
  flex-flow: column;
`;

S.Title = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

S.MyRankBox = styled.div`
  padding: 0 15px;
  color: #1d1d1f;
`;

S.MyRank = styled.div`
  width: 100%;
  background: #f5f5f7;
  padding: 20px 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

S.Brand = styled.div`
  font-weight: bold;
`;

S.Stat = styled.div`
  
`;