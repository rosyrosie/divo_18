import styled from 'styled-components';
import Loading from '@/components/Loading';
import { createSectionOrderString } from '@functions';
import { useFetch } from '@hooks';
import { KA_SECTION_URL } from '@api';
import { useParams } from 'react-router-dom';

export default function SectionOrder(){
  const { keyword } = useParams();
  const { payload, loading, error } = useFetch(
    KA_SECTION_URL + keyword,
    null,
    'GET',
    [keyword]
  );

  return (
    <S.Section color={'#38555f'}>
      <S.Width>
        {!loading ? 
        <>
          <S.OrderBox>
            <S.Order>
              {payload && createSectionOrderString(payload?.pc)}
            </S.Order>
            <S.Device>PC 섹션 배치 순서</S.Device>
          </S.OrderBox>
          <S.OrderBox alignRight>
            <S.Order>
              {payload && createSectionOrderString(payload?.mobile)}
            </S.Order>
            <S.Device>모바일 섹션 배치 순서</S.Device>
          </S.OrderBox> 
        </>
        : <Loading isWhite/>}
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

S.Order = styled.div`
  color: #f5f5f7;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
`;

S.Device = styled.div`
  color: #f5f5f7;
  font-size: 16px;
  opacity: .8;
`;

S.OrderBox = styled.div`
  display: flex;
  flex-flow: column;
  ${props => props.alignRight ? 'align-items: end;' : 'margin-bottom: 50px;'}
`;