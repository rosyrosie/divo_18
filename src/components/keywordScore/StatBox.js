import styled from 'styled-components';
import { statBoxTemplate } from '@constants';

export default function StatBox({ stats, loading, type }){
  return (
    <>
      <S.SubTitle>마케팅 효율</S.SubTitle>
      {statBoxTemplate(stats, loading)[type === 'brand' ? type : 'catsec'].map((statList, i) => (
        <S.Stats key={i}>
          {statList.map((stat, i) => (
            <S.Stat key={i}>
              <S.StatName>
                {stat.statName}
                <S.Help>
                  <i className="far fa-question-circle"></i>
                  <S.Pop>{stat.pop}</S.Pop>
                </S.Help>
              </S.StatName>
              <S.Index>{stat.index}</S.Index>
            </S.Stat>
          ))}
        </S.Stats>
      ))}
    </>
  );
}

const S = {};

S.SubTitle = styled.div`
  color: #1d1d1f;
  font-weight: 600;
  margin-top: 20px;
  font-size: 18px;
`;

S.Stats = styled.div`
  display: flex;
  margin-top: 40px;
`;

S.Stat = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

S.StatName = styled.div`
  color: #515154;
  font-size: 14px;
  display: flex;
`;

S.Index = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

S.Pop = styled.div`
  position: absolute;
  bottom: 25px;
  left: -15px;
  background: #1d1d1f;
  padding: 10px;
  border-radius: 10px;
  color: #f5f5f7;
  width: 255px;
  line-height: 150%;
  display: none;
  font-size: 12px;
`;

S.Help = styled.div`
  margin-left: 5px;
  position: relative;
  &:hover ${S.Pop}{
    display: flex;
  }
`;