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

  const pcList = payload?.pc.slice(0, 10);
  const mobileList = payload?.mobile.slice(0, 10);

  return (
    <S.Section color={'#38555f'}>
      <S.Width>
        {!loading ? 
        <>
          <S.OrderBox>
            <S.Order>
              {pcList.map((section, i) => (
                <S.VAlign key={i}>
                  <div>{section}</div>
                  {i<pcList.length-1 && <S.Arrow>{'>'}</S.Arrow>}
                </S.VAlign>
              ))}
            </S.Order>
            <S.Device>PC 섹션 배치 순서</S.Device>
          </S.OrderBox>
          <S.OrderBox alignRight>
            <S.Order>
              {mobileList.slice(0, 10).map((section, i) => (
                <S.VAlign key={i}>
                  <div>{section}</div>
                  {i<mobileList.length-1 && <S.Arrow>{'>'}</S.Arrow>}
                </S.VAlign>
              ))}
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

S.VAlign = styled.div`
  display: flex;
  align-items: center;
`;

S.Arrow = styled.div`
  font-size: 10px;
  display: flex;
  flex-flow: column;
  margin: 0 5px;
`;

S.Order = styled.div`
  color: #f5f5f7;
  //font-weight: bold;
  font-size: 17.5px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

S.Device = styled.div`
  color: #f5f5f7;
  font-size: 14px;
  opacity: .8;
`;

S.OrderBox = styled.div`
  display: flex;
  flex-flow: column;
  ${props => props.alignRight ? 'align-items: end;' : 'margin-bottom: 50px;'}
`;