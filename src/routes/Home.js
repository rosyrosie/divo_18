import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from '@hooks';
import { CORPLIST_URL } from "@api";
import { useEffect } from "react";
import kaImg from '@/assets/keyword-analysis.jpg';

export default function Home(){
  const { corpId } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { payload, error } = useFetch(
    CORPLIST_URL,
    null,
    'GET',
    [],
    token
  );

  useEffect(() => {
    if(!payload) return;
    if(!corpId && token){
      if(!payload.corpList.length) navigate('/cid=0');
      else navigate('/cid=' + payload?.corpList?.[0]?.[0]);
    }
  }, [payload]);
  
  return (
    <S.Content>
      <S.Box>
        <S.Title>당신의 가게를 책임질</S.Title>
        <S.Title>단 하나의 솔루션</S.Title>
        <S.SubTitle>매출 관리부터 마케팅까지</S.SubTitle>
        <S.Down><i class="fas fa-chevron-down"></i></S.Down>
      </S.Box>
      <S.ImgBox img={kaImg}>
        <S.Title isWhite>키워드 분석</S.Title>
      </S.ImgBox>
    </S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: #1d1d1f;
`;

S.Box = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 280px 0;
  position: relative;
  position: sticky;
  top: 48px;
  background: #f5f5f7b3;
`;

S.Title = styled.div`
  font-weight: 900;
  font-size: 54px;
  margin-bottom: 10px;
  ${props => props.isWhite ? 'color: #f5f5f7;' : ''}
`;

S.SubTitle = styled.div`
  font-weight: 400;
  font-size: 24px;
  margin-top: 60px;
  color: #515154;
`;

S.FeatureBox = styled.div`
  background: white;
  z-index: 2;
  width: 100%;
  height: 100vh;
`;

S.ImgBox = styled.div`
  background: url(${props => props.img});
  background-size: cover;
  height: 100vh;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 280px;
`;

S.Down = styled.div`
  position: absolute;
  bottom: 50px;
  font-size: 20px;
  &:hover{
    cursor: pointer;
  }
`;