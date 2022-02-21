import styled from 'styled-components';

export default function Sidebar(){
  return (
    <S.Sidebar>
      <S.Divo>DIVO</S.Divo>
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
  background: #f6f6f6;
  width: 10%;
  padding: 25px;
`;

S.Divo = styled.div`
  font-family: 'Montserrat';
  font-size: 30px;
  margin-bottom: 80px;
`;

S.Menu = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-bottom: 50px;
`;

S.Icon = styled.div`
  width: 25px;
  margin-right: 15px;
`;