import { useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

export default function TopTwentyBox({ isCat, setIsCat, corpList, setIndex, setFold }){
  const [ showRank, setShowRank ] = useState(true);

  const onClickCorp = index => {
    setIndex(index);
    setFold(false);
  }

  const myCorp = corpList?.[0];

  return (
    <S.Sidebar>
      <S.Leaderboard>
        <S.TitleFlex>
          <S.Box onClick={() => setShowRank(s => !s)}>
            <S.Title>내 주변 {isCat && '동일 업종 '}Top 20<S.Icon><i className={showRank ? "fas fa-angle-up" : "fas fa-angle-down"}></i></S.Icon></S.Title>
          </S.Box>
          <Switch onChange={() => setIsCat(c => !c)} checked={isCat} height={12} width={32} handleDiameter={20} checkedIcon={false} uncheckedIcon={false} onColor='#888' />
        </S.TitleFlex>
        <S.MyRankBox onClick={() => onClickCorp(0)}>
          <S.MyRank>
            <S.Flex>
              <S.Num>{isCat ? myCorp?.inAreaCatRank : myCorp?.inAreaRank}</S.Num>
              <S.Brand>{myCorp?.corpName}</S.Brand>
            </S.Flex>
            <S.Stat>{myCorp?.rank}{myCorp?.rank !== '순위권 밖' ? '위' : ''}</S.Stat>
          </S.MyRank>
        </S.MyRankBox>
        {showRank && 
          <S.Scroll>
            {corpList.slice(1)?.map((corp, i) => (
              <S.RankBox key={i} onClick={() => onClickCorp(i+1)}>
                <S.Rank>
                  <S.Flex>
                    <S.Num>{i+1}</S.Num>
                    <S.Brand>{corp?.corpName}</S.Brand>
                  </S.Flex>
                  <S.Stat>{corp?.rank}{corp?.rank !== '순위권 밖' ? '위' : ''}</S.Stat>
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

S.Button = styled.div`
  font-size: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #1d1d1f;
  ${props => props.left ? 'margin-left: 5px; justify-content: center;' : ''}
`;

S.TitleFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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
  width: 288px;
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