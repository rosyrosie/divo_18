import styled from 'styled-components';
import { CORPLIST_URL } from '../environments/Api';
import { useFetch } from '../environments/Hooks';

const corpList = ['당산오돌 본점', '샤브향 대전테크노점', '산내돌짜장'];

export default function CorpListModal({ setShowModal }){
  const { payload, error } = useFetch(
    CORPLIST_URL,
    null,
    'GET'
  );

  return (
    <S.Body>
      <S.Modal>
        <S.Title><S.Icon onClick={() => setShowModal(false)}><i class="fas fa-times"></i></S.Icon></S.Title>
        {corpList.map(corp => (
          <S.Corp>{corp}</S.Corp>
        ))}
      </S.Modal>
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d1d1f;
`;

S.Modal = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  flex-flow: column;
  padding: 20px 0;
  min-width: 350px;
`;

S.Title = styled.div`
  display: flex;
  justify-content: right;
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid #d2d2d7;
`;

S.Corp = styled.div`
  justify-content: center;
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #d2d2d7;
  opacity: .8;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: #f5f5f7;
    opacity: 1;
  }
`;

S.Icon = styled.div`
  &:hover{
    cursor: pointer;
  }
`;