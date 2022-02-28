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
    map.setDraggable(false);
    map.setZoomable(false);
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

  let brandList = [];
  for(var i=0; i<20; i++) brandList.push({ name: `브랜드 ${i}`, rank: i*1000});

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
              <S.Flex>
                <S.Num>25</S.Num>
                <S.Brand>내 브랜드</S.Brand>
              </S.Flex>
              <S.Stat>200,000위</S.Stat>
            </S.MyRank>
          </S.MyRankBox>
          <S.Scroll>
            {brandList.map((brand, i) => (
              <S.RankBox>
                <S.Rank>
                  <S.Flex>
                    <S.Num>{i+1}</S.Num>
                    <S.Brand>{brand.name}</S.Brand>
                  </S.Flex>
                  <S.Stat>{brand.rank}위</S.Stat>
                </S.Rank>
              </S.RankBox>
            ))}
          </S.Scroll>
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

S.Scroll = styled.div`
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  &::-webkit-scrollbar {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(245, 245, 247, 0.5);
  }
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
  color: #f5f5f7;
  padding-bottom: 20px;
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

S.Brand = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  flex: 1;
`;

S.Stat = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: 12px;
`;

S.RankBox = styled.div`
  margin: 0 15px;
  border-bottom: 1px solid rgba(245, 245, 247, 0.2);
`;

S.Rank = styled.div`
  width: 100%;
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.MyRankBox = styled(S.RankBox)`
  color: #1d1d1f;
  border-bottom: none;
`;

S.MyRank = styled(S.Rank)`
  background: #f5f5f7;
  border-radius: 10px;
`;

S.Num = styled.div`
  font-family: 'Montserrat';
  font-weight: bold;
  margin-right: 5px;
  font-size: 12px;
  width: 20px;
  display: flex;
  align-items: center;
`;

S.Flex = styled.div`
  display: flex;
`;