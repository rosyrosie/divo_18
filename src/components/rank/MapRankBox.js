import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { lineOptions } from '@constants';
import { applyStyleToChart } from '@functions';
import Loading from '@/components/Loading';

export default function MapRankBox({ corp, setShowSelected, setSelectedIndex, loading }){
  if(loading) return (
    <S.Center>
      <Loading />
    </S.Center>
  );

  return (
    <S.BrandInfo>
      <S.Goback>
        <S.BackIcon onClick={() => {setShowSelected(false); setSelectedIndex(-1);}}>
          <i className="fas fa-arrow-left"></i>
        </S.BackIcon>
      </S.Goback>
      <S.InfoName><S.A href={corp?.url} target="_blank">{corp?.name}</S.A></S.InfoName>
      <S.InfoCat>{corp?.category}</S.InfoCat>
      <S.InfoReview>
        <S.Review>블로그리뷰 {corp?.blogReviewNum}개</S.Review>
        <div>방문자리뷰 {corp?.visitorReviewNum}개</div>
      </S.InfoReview>
      <S.InfoRatio>상위 {corp?.ratio}%</S.InfoRatio>
      <S.InfoRank>{corp?.rank}{corp?.rank === '순위권 밖' ? '' : '위'}</S.InfoRank>
      <S.InfoDelta color={corp?.delta > 0 ? '#de071c' : corp?.delta === 0 ? '#1d1d1f' : '#06c'}>{corp?.delta !== 0 ? `${Math.abs(corp?.delta).toLocaleString()}위 ${corp?.delta >= 0 ? '상승' : '하락'}` : '변동 없음'}</S.InfoDelta>
      <S.InfoChart>
        {corp && <Line options={lineOptions('위', false, false, false, true)} data={applyStyleToChart(corp.chart, 'dark')} />}
      </S.InfoChart>
      <S.PartialRank>
        <S.Flex>
          <S.InfoIcon>
            <i className="fas fa-globe"></i>
          </S.InfoIcon>
          내 상권에서
        </S.Flex>
        <S.Ratio>상위 {corp?.inAreaRatio}%</S.Ratio>
      </S.PartialRank>
      <S.PartialRank>
        <S.Flex>
          <S.InfoIcon>
            <i className="fas fa-utensils"></i>
          </S.InfoIcon>
          내 업종에서
        </S.Flex>
        <S.Ratio>상위 {corp?.inCatRatio}%</S.Ratio>
      </S.PartialRank>
      <S.PartialRank>
        <S.Flex>
          <S.InfoIcon>
            <i className="fas fa-map-marker-alt"></i>
          </S.InfoIcon>
          내 상권 속 업종에서
        </S.Flex>
        <S.Ratio>상위 {corp?.inAreaCatRatio}%</S.Ratio>
      </S.PartialRank>
    </S.BrandInfo>
  );
}

const S = {};

S.A = styled.a`
  color: inherit;
  text-decoration: none;
`;

S.Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

S.Goback = styled.div`
  padding: 10px 0 30px 0;
`;

S.BackIcon = styled.div`
  &:hover{
    cursor: pointer;
  }
`;

S.BrandInfo = styled.div`
  width: 320px;
  z-index: 1;
  background: white;
  padding: 0 20px;
  display: flex;
  flex-flow: column;
  color: #1d1d1f;
  border-radius: 0 20px 20px 0;
`;

S.Review = styled.div`
  margin-bottom: 5px;
`;

S.Fold = styled.div`
  position: absolute;
  height: 50px;
  width: 30px;
  background: white;
  left: ${props => props.fold ? '0' : '15%'};
  top: 50%;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  border-left: 1px solid #d2d2d7;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .8;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
`;

S.FoldIcon = styled.div`
  z-index: 2;
`;

S.InfoName = styled.div`
  font-weight: 800;
  font-size: 18px;
  justify-content: space-between;
`;

S.InfoCat = styled.div`
  color: #515154;
  font-size: 14px;
  margin-top: 10px;
`;

S.InfoReview = styled.div`
  color: #06c;
  padding: 10px 0 30px 0;
  font-size: 14px;
`;

S.InfoRatio = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  font-size: 14px;
  border-top: 1px solid #d2d2d7;
`;

S.InfoRank = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Montserrat', 'Pretendard';
  margin: 10px 0;
  font-size: 32px;
  font-weight: bold;
`;

S.InfoDelta = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Montserrat', 'Pretendard';
  font-size: 14px;
  color: ${props => props.color};
  padding-bottom: 30px;
`;

S.InfoChart = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid #d2d2d7;
  height: 200px;
`;

S.PartialRank = styled.div`
  padding: 20px 15px;
  border-bottom: 1px solid #d2d2d7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

S.Ratio = styled.div`
  font-weight: 600;
`;

S.InfoIcon = styled.div`
  margin-right: 8px;
  width: 14px;
`;

S.Flex = styled.div`
  display: flex;
  min-width: 0;
`;