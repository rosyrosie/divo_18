import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoginRequired from '@/components/LoginRequired';
import { CORPLIST_URL, DEL_CORP_URL } from '@api';
import { useFetch } from '@hooks';

export default function CorpManagement(){
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { corpId } = useParams();
  const { payload, error } = useFetch(
    CORPLIST_URL,
    null,
    'GET'
  );

  const deleteCorp = id => {
    if(id === corpId){
      alert('현재 접속 중인 브랜드는 삭제할 수 없습니다.');
      return;
    }
    if(!window.confirm('정말 삭제하시겠습니까?')) return;
    const tokenHeader = token ? {headers: {"Authorization": `Token ${token}`}} : null;
    axios.delete(DEL_CORP_URL+id, tokenHeader).then(
      res => {
        if(res.data.message === 'success'){
          alert('삭제되었습니다.');
          window.location.reload();
        }
      }
    );
  }

  if(!token) return (
    <LoginRequired />
  );

  return (
    <S.Content>
      {payload?.corpList.map(corp => (
        <S.Corp onClick={() => deleteCorp(corp[0])} key={corp[0]}>{corp[1]}</S.Corp>
      ))}
      <S.Add onClick={() => navigate(`/cid=${corpId}/corp-addition`)}>브랜드 추가하기</S.Add>
    </S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

S.Add = styled.div`
  color: #06c;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  margin-top: 20px;
`;

S.Corp = styled.div`
  color: #1d1d1f;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
  opacity: .8;
  &:hover{
    opacity: 1;
    cursor: pointer;
  }
`;