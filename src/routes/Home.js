import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Home(){
  const navigate = useNavigate();
  return (
    <S.Content>
      <S.Box>
        <S.Title>당신의 매장을 책임질</S.Title>
        <S.Title>단 하나의 솔루션</S.Title>
        <S.SubTitle>
          매출관리 등 더 다양한 기능을 사용하고 싶다면?
          <S.Links>
            <S.A href="https://corp.divo.kr" target="_blank" rel="noopener noreferrer"> 보러가기 {'>'} </S.A>
            <S.A onClick={() => navigate('community/board=qna')}> 질문하기 {'>'} </S.A>
            <S.A href="https://divo-user-guide.notion.site/divo-user-guide/Divo-ef2c048d77134022b1828499dc77e59b" target="_blank" rel="noopener noreferrer"> 설명서 보기 {'>'} </S.A>
          </S.Links>
        </S.SubTitle>
        <S.Cf>
          사용문의
          <S.Email>webkim@naver.com</S.Email>
        </S.Cf>
      </S.Box>
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

S.Cf = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 72px;
  font-weight: bold;
`;

S.Email = styled.div`
  margin-top: 8px;
  font-weight: normal;
`;

S.Box = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  position: sticky;
  top: 48px;
  background: #f5f5f7b3;
`;

S.Title = styled.div`
  font-weight: 900;
  font-size: 48px;
  margin-bottom: 10px;
  ${props => props.isWhite ? 'color: #f5f5f7;' : ''}
`;

S.SubTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 60px;
  color: #515154;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

S.A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #06c;
  font-weight: normal;
  font-size: 18px;
  margin-right: 12px;
  &:hover{
    text-decoration: underline;
  }
`;

S.Links = styled.span`
  margin-top: 24px;
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