import { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { lineOptions, salesLineData } from '@constants';
import { applyStyleToChart } from '@functions';

export default function MapRankBox({ corp, fold, setFold }){
  console.log(corp);

  return (
    <>
      {!fold && 
        <S.BrandInfo>
          <S.InfoName>{corp?.corpName}</S.InfoName>
          <S.InfoCat>{corp?.category}</S.InfoCat>
          <S.InfoReview>
            <S.Review>블로그리뷰 {corp?.blogReviewNum}개</S.Review>
            <div>방문자리뷰 {corp?.visitorReviewNum}개</div>
          </S.InfoReview>
          <S.InfoRatio>상위 {corp?.ratio}%</S.InfoRatio>
          <S.InfoRank>{corp?.rank}{corp?.rank === '순위권 밖' ? '' : '위'}</S.InfoRank>
          <S.InfoDelta color={corp?.delta > 0 ? '#de071c' : corp?.delta === 0 ? '#1d1d1f' : '#06c'}>{corp?.delta !== 0 ? `${Math.abs(corp?.delta)}위 ${corp?.delta >= 0 ? '상승' : '하락'}` : '변동 없음'}</S.InfoDelta>
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
      }
      <S.Fold onClick={() => setFold(f => !f)} fold={fold}>
        <S.FoldIcon>
          <i className={fold ? "fas fa-caret-right" : "fas fa-caret-left"}></i>
        </S.FoldIcon>
      </S.Fold>
    </>
  );
}

const S = {};

S.BrandInfo = styled.div`
  position: absolute;
  top: 88px;
  left: 0;
  bottom: 40px;
  width: 15%;
  z-index: 1;
  background: white;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  padding: 40px 20px;
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
  font-family: 'Montserrat', 'SUIT';
  margin: 10px 0;
  font-size: 32px;
  font-weight: bold;
`;

S.InfoDelta = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Montserrat', 'SUIT';
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