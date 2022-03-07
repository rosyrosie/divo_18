import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoginRequired from '@/components/errorPage/LoginRequired';
import { CORPLIST_URL, DEL_CORP_URL } from '@api';
import { useFetch } from '@hooks';

export default function CorpManagement(){
  const token = localStorage.getItem('token');
  const tokenHeader = token ? {headers: {"Authorization": `Token ${token}`}} : null;
  const navigate = useNavigate();
  const { corpId } = useParams();
  const { payload, error } = useFetch(
    CORPLIST_URL,
    null,
    'GET'
  );

  const deleteCorp = id => {
    if(id === corpId*1){
      alert('현재 접속 중인 브랜드는 삭제할 수 없습니다.');
      return;
    }
    if(!window.confirm('정말 삭제하시겠습니까?')) return;
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
      <S.Flex>
        {payload?.corpList.map(corp => (
          <S.Corp key={corp[0]}>
            <S.Title>{corp[1]}</S.Title>
            <S.Col>
              {corp[2]==='not Linked' ? 
                <S.Link onClick={() => navigate(`/cid=${corp[0]}/sync-ys`)}>매출액 연동</S.Link> : 
                corp[2]==='on Sync' ? <S.Link color="#515154" inactive>매출액 연동 중</S.Link> : <S.Link color="#515154" inactive>매출액 연동 완료</S.Link>
              }
              {corp[3]==='enable' && <S.Link onClick={() => navigate(`/cid=${corp[0]}/keyword-admin`)}>키워드 관리</S.Link>}
              <S.Link onClick={() => navigate(`/cid=${corp[0]}/corp-auth`)}>접근권한 관리</S.Link>
              <S.Link color={'#de071c'} onClick={() => deleteCorp(corp[0])}>브랜드 삭제</S.Link>
            </S.Col>
          </S.Corp>
        ))}
      </S.Flex>
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
  background: #f5f5f7b3;
`;

S.Add = styled.div`
  color: #06c;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  margin-top: 40px;
`;

S.Corp = styled.div`
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  background: white;
  padding: 25px;
  min-width: 260px;
  width: 260px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 210px;
  margin: 0 20px 20px 0;
`;

S.Flex = styled.div`
  display: flex;
  max-width: 60%;
  flex-wrap: wrap;
  max-height: 690px;
  overflow-y: auto;
`;

S.Col = styled.div`
  display: flex;
  flex-flow: column;
`;

S.Link = styled.div`
  margin-top: 10px;
  font-size: 14px;
  ${props => props.color ? `color: ${props.color};` : 'color: #06c;'}
  ${props => props.inactive ? '' : '&:hover{ text-decoration: underline; cursor: pointer; }'}
`;

S.Title = styled.div`
  color: #1d1d1f;
  font-weight: bold;
  font-size: 16px;
  flex-wrap: wrap;
`;