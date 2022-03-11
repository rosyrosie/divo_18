import { useState } from 'react';
import styled from 'styled-components';

export default function QueryBox({ keyword, queryList, setHoverIndex, moveToCorp }){
  const [ showRank, setShowRank ] = useState(true);

  return (
    <S.Sidebar>
      <S.Leaderboard>
        <S.TitleFlex>
          <S.Box onClick={() => setShowRank(s => !s)}>
            <S.Title>검색 결과<S.Icon><i className={showRank ? "fas fa-angle-up" : "fas fa-angle-down"}></i></S.Icon></S.Title>
          </S.Box>
        </S.TitleFlex>
        {showRank && 
          <S.Scroll onMouseLeave={() => setHoverIndex(-1)}>
            {queryList?.map((corp, i) => (
              <S.RankBox key={i} onClick={() => moveToCorp(i, corp)} onMouseEnter={() => setHoverIndex(i)}>
                <S.Rank>
                  <S.Flex>
                    <S.Num>{i+1}</S.Num>
                    <S.Brand>{corp?.name}</S.Brand>
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
  padding: 20px 20px 0 20px;
`;

S.Scroll = styled.div`
  margin-top: 20px;
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
  padding: 15px;
`;

S.Leaderboard = styled.div`
  width: 100%;
  max-height: 100%;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-flow: column;
  font-size: 14px;
  color: #1d1d1f;
  padding-bottom: 20px;
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;

S.Box = styled.div`
  width: 100%;
  color: #1d1d1f;
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
  font-weight: 600;
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
  border-bottom: 1px solid #f5f5f7;
  color: #1d1d1f;
  &:hover{
    cursor: pointer;
    background: #f5f5f7;
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