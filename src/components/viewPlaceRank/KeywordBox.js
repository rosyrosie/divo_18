import styled from 'styled-components';

export default function KeywordBox({ rank, index, tab, list, clickKeyword }){
  const maxRank = [31, 51];
  const replaceString = ['30+', '50+'];
  const mode = ['view', 'place'];
  const sign = rank[mode[tab]+'Delta'] > 0 ? 1 : rank[mode[tab]+'Delta'] === 0 ? 0 : -1;

  return (
    <S.Fit key={rank.keyword}>
      <S.Kw onClick={() => clickKeyword(list, index)}>
        <S.Word>{rank.keyword}</S.Word>
        <S.Qty>최근 1개월 검색량 <S.Num>{rank.searchAmount.toLocaleString()}</S.Num></S.Qty>
        <S.Rank>
          {rank[mode[tab]] !== maxRank[tab] ? rank[mode[tab]] : replaceString[tab]}위
          <S.Delta sign={sign}>
            <S.Icon>
              {sign > 0 ? 
                <i className="fas fa-caret-up"></i> :
              sign < 0 ?
                <i className="fas fa-caret-down"></i> :
                <S.Zero>-</S.Zero>
              }
            </S.Icon>
            {Math.abs(rank[mode[tab] + 'Delta']) || ''}
          </S.Delta>
        </S.Rank>
      </S.Kw>
    </S.Fit>
  );
}

const S = {};

S.Zero = styled.div`
  font-size: 32px;
`;

S.Kw = styled.div`
  display: flex;
  flex-flow: column;
  background: white;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  padding: 30px;
  margin: 5px;
  flex: 1;
  &:hover{
    cursor: pointer;
    transform: scale(1.02);
  }
  transition: .3s;
`;

S.Word = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

S.Qty = styled.div`
  font-size: 13px;
  color: #515154;
  display: flex;
`;

S.Num = styled.div`
  font-weight: 600;
  margin-left: 5px;
  font-family: 'Montserrat';
`;

S.Fit = styled.div`
  width: 20%;
  display: flex;
`;

S.Rank = styled.div`
  font-weight: 600;
  font-family: 'Montserrat', 'SUIT';
  font-size: 28px;
  margin-top: 30px;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

S.Delta = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${props => props.sign===1 ? '#de071c' : !props.sign ? '#1d1d1f' : '#06c'};
`;

S.Icon = styled.div`
  font-size: 16px;
  margin-right: 3px;
`;

