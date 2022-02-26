import styled from 'styled-components';

export default function CardSection({ cards }){
  return (
    <S.Section color={'#f5f5f7'}>
      <S.Width>
        <S.Stats>
          {cards.map((card, i) => (
            <S.Col index={i} key={i}>
              <S.Day>{card.title}</S.Day>
              <S.Date>{card.date}</S.Date>
              <S.Stat>{card.stat}<S.Scale>{card.scale}</S.Scale></S.Stat>
              <S.Compare>{card.grade}</S.Compare>
            </S.Col>
          ))}
        </S.Stats>
      </S.Width>
    </S.Section>
  );
}

const S = {};

S.Section = styled.div`
  width: 100%;
  ${props => `background: ${props.color};`}
  display: flex;
  justify-content: center;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  flex-flow: column;
  padding: 50px 0;
`;

S.Col = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  padding-left: 30px;
  padding-bottom: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  ${props => props.index===1 ? 'margin: 0 40px;' : ''}
  ${props => props.isWhite ? 'background: none; box-shadow: none;' : ''}
`;

S.Stats = styled.div`
  display: flex;
  ${props => props.isWhite ? 'margin-top: 40px;' : ''}
`;

S.Day = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  //justify-content: center;
  margin: 40px 0 20px 0;
`;

S.Date = styled.div`
  display: flex;
  color: #aaaaaa;
  margin-bottom: 40px;
  ${props => props.isWhite ? 'color: white;' : ''}
  //justify-content: center;
`;

S.Stat = styled.div`
  display: flex;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: 'Montserrat';
  display: flex;
  align-items: end;
  ${props => props.isWhite ? 'margin: 0;' : ''}
`;

S.Compare = styled.div`
  display: flex;
  color: #aaaaaa;
  margin-bottom: 10px;
`;

S.Blue = styled.div`
  color: #06c;
  font-weight: 900;
  margin-left: 10px;
`;

S.Red = styled.div`
  color: #f60;
  font-weight: 900;
  margin-left: 10px;
`;

S.Scale = styled.div`
  font-family: 'SUIT';
  font-size: 20px;
  padding-bottom: 5px;
  padding-left: 5px;
`;