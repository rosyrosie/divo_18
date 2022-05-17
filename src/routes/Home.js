import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const navigate = useNavigate();
  return (
    <S.Content>
      <S.Box>
        <S.Title onClick={() => navigate('system')}>당신의 매장을 책임질</S.Title>
        <S.Title onClick={() => navigate('growth')}>단 하나의 솔루션</S.Title>
        <S.SubTitle onClick={() => navigate('index-map')}>매출 관리부터 마케팅까지</S.SubTitle>
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