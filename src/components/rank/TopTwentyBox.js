import { useState } from 'react';
import styled from 'styled-components';

export default function TopTwentyBox({ corpList, setIndex, setFold }){
  const [ showRank, setShowRank ] = useState(true);

  let brandList = [];
  for(var i=0; i<20; i++) brandList.push({ name: `브랜드 ${i}`, rank: i*1000});

  const myCorp = corpList[0];

  const onClickCorp = index => {
    setIndex(index);
    setFold(false);
  }

  return (
    <S.Sidebar>
      <S.Leaderboard>
        <S.Box onClick={() => setShowRank(s => !s)}>
          <S.Title>내 주변 상위 20개 점포<S.Icon><i class={showRank ? "fas fa-angle-up" : "fas fa-angle-down"}></i></S.Icon></S.Title>
        </S.Box>
        <S.MyRankBox onClick={() => onClickCorp(0)}>
          <S.MyRank>
            <S.Flex>
              <S.Num>{myCorp.inAreaRank}</S.Num>
              <S.Brand>{myCorp.corpName}</S.Brand>
            </S.Flex>
            <S.Stat>{myCorp.rank}위</S.Stat>
          </S.MyRank>
        </S.MyRankBox>
        {showRank && 
          <S.Scroll>
            {corpList.slice(1).map((corp, i) => (
              <S.RankBox key={corp.rank} onClick={() => onClickCorp(i+1)}>
                <S.Rank>
                  <S.Flex>
                    <S.Num>{i+1}</S.Num>
                    <S.Brand>{corp.corpName}</S.Brand>
                  </S.Flex>
                  <S.Stat>{corp.rank}위</S.Stat>
                </S.Rank>
              </S.RankBox>
            ))}
          </S.Scroll>
        }
      </S.Leaderboard>
    </S.Sidebar>
  );
}

const S = {};

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
  max-height: 100%;
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
  &:hover{
    cursor: pointer;
  }
`;

S.Title = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

S.Brand = styled.div`
  display: inline-block;
  align-items: center;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
`;

S.Stat = styled.div`
  width: 60px;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: 12px;
`;

S.RankBox = styled.div`
  margin: 0 15px;
  border-bottom: 1px solid rgba(245, 245, 247, 0.2);
  &:hover{
    cursor: pointer;
  }
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
  min-width: 20px;
  display: flex;
  align-items: center;
`;

S.Flex = styled.div`
  display: flex;
  min-width: 0;
`;

S.Icon = styled.div`
  margin-left: 5px;
`;