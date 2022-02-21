import styled from 'styled-components';

export default function Sidebar(){
  return (
    <S.Sidebar>
      <S.Divo>Divo</S.Divo>
      <S.Menu>
        <S.Icon>
          <i class="fab fa-google-drive"></i>
        </S.Icon>
        키워드 분석
      </S.Menu>
      <S.Menu>
        <S.Icon>
          <i class="fas fa-coins"></i>
        </S.Icon>
        매출액 분석
      </S.Menu>
      <S.Menu>
        <S.Icon>
          <i class="fas fa-utensils"></i>
        </S.Icon>
        음식점 순위
      </S.Menu>
    </S.Sidebar>
  );
}

const S = {};

S.Sidebar = styled.div`
  width: 150px;
  padding: 40px;
  color: #bbc3ce;
  background: white;
`;

S.Divo = styled.div`
  font-family: 'Montserrat';
  font-size: 30px;
  margin-bottom: 80px;
`;

S.Menu = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
  padding-bottom: 50px;
`;

S.Icon = styled.div`
  width: 25px;
  margin-right: 20px;
  font-size: 20px;
`;