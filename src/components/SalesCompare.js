import styled from 'styled-components';

export default function SalesCompare(){
  return (
    <S.Fill color={'white'}>
      <S.Width>
        <S.Text>
          <S.Title>점포 특성 분석</S.Title>
          <S.Comment>다양한 매출 지표를 통해 점포 및 방문고객 특성을 도출하여 마케팅 방향성을 제시합니다.</S.Comment>
        </S.Text>
      </S.Width>
    </S.Fill>
  );
}

const S = {};

S.Fill = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;  
  background: ${props => props.color};
  //box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.3);
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  padding: 50px 0;
`;

S.Text = styled.div`
  flex: 2;
  display: flex;
  flex-flow: column;
  ${props => props.right && 'align-items: end;'}
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  color: #1d1d1f;
`;

S.Comment = styled.div`
  margin: 10px 0;
  color: #515154;
`;