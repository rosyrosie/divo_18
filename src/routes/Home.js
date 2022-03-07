import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from '@hooks';
import { CORPLIST_URL } from "@api";
import { useEffect } from "react";
import kaImg from '@/assets/2.jpg';

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
        <S.Title>당신의 매장을 책임질</S.Title>
        <S.Title>단 하나의 솔루션</S.Title>
        <S.SubTitle>매출 관리부터 마케팅까지</S.SubTitle>
        <S.Down><i className="fas fa-chevron-down"></i></S.Down>
      </S.Box>
      <S.ImgBox>
        <S.Flex>
          <S.TextBox flex={2} color={['#2a3142', '#f5f5f7']}>
            <S.Text>매일매일,</S.Text>
            <S.Text>내 점포를 한 눈에</S.Text>
            <S.RowBlank />
            <S.SubText size={28}>마케팅 진단부터</S.SubText>
            <S.SubText size={28}>매출 요인 분석까지</S.SubText>
          </S.TextBox>
          <S.ColBlank />
          <S.TextBox flex={1} color={['#f5f5f7', '#1d1d1f']}>
            <S.Text>이 가게,</S.Text>
            <S.Text>차려도 될까?</S.Text>
            <S.RowBlank />
            <S.SubText size={28}>트렌드 예측부터</S.SubText>
            <S.SubText size={28}>수명주기 진단까지</S.SubText>
          </S.TextBox>
        </S.Flex>
        <S.RowBlank />
        <S.TextBox flex={1} color={['rgba(0, 0, 0, 0.7)', '#f5f5f7']}>
          <S.Text>내 매장은</S.Text>
          <S.Text>전국 몇 등일까?</S.Text>
          <S.RowBlank />
          <S.SubText size={28}>키워드 빅데이터 기반</S.SubText>
          <S.SubText size={28}>전국 음식점 랭킹</S.SubText>
        </S.TextBox>
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

S.Down = styled.div`
  position: absolute;
  bottom: 50px;
  font-size: 20px;
  &:hover{
    cursor: pointer;
  }
`;

S.ImgBox = styled.div`
  background: white;
  width: 100%;
  z-index: 2;
  display: flex;
  padding: 100px 280px;
  flex-flow: column;
`;

S.TextBox = styled.div`
  width: 100%;
  border-radius: 25px;
  padding: 120px 40px;
  font-weight: bold;
  font-size: 50px;
  background: ${props => props.color[0]};
  color: ${props => props.color[1]};
  display: flex;
  flex-flow: column;
  flex: ${props => props.flex};
`;

S.Text = styled.div`
  margin-bottom: 10px;
`;

S.SubText = styled(S.Text)`
  font-weight: 500;
  font-size: ${props => props.size}px;
`;

S.RowBlank = styled.div`
  height: 20px;
  width: 100%;
`;

S.ColBlank = styled.div`
  height: 100%;
  width: 20px;
`;

S.Flex = styled.div`
  display: flex;
`;