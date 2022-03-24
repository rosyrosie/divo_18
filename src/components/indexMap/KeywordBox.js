import styled from 'styled-components';
import { useFetch } from '@hooks';
import { RANK_OM_URL } from '@api';
import { Line } from 'react-chartjs-2';
import { mapLineOptions } from '@constants';
import { applyStyleToMapChart } from '@functions';

export default function KeywordBox({ keyword, setShowKwBox }){
  return (
    <S.Box>
      <S.Title>
        {keyword}
        <S.Close onClick={() => setShowKwBox(false)}><i className="fas fa-times"></i></S.Close>
      </S.Title>                                                                                                                                                                             
    </S.Box>
  );
}

const S = {};

S.Box = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(180%) blur(12px);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  color: #f5f5f7;
  padding: 20px;
  display: flex;
  flex-flow: column;
`;

S.Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

S.Close = styled.div`
  &:hover{
    cursor: pointer;
  }
`;

S.Ratio = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 12px;
`;

S.Rank = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Montserrat', 'SUIT';
  margin-top: 10px;
`;

S.Delta = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 12px;
`;

S.Chart = styled.div`
  margin-top: 20px;
`;