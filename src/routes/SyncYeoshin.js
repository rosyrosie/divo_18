import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GET_YS_CAT_URL, SYNC_YS_URL, SYNC_SALES_URL } from '@api';
import { tokenHeader } from '@constants';

export default function SyncYeoshin(){
  const { corpId } = useParams();
  const [ ysId, setYsId ] = useState('');
  const [ ysPw, setYsPw ] = useState('');
  const [ categoryList, setCategoryList ] = useState(null);
  const [ mergrpId, setMergrpId ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const getYsCategory = e => {
    e.preventDefault();
    const body = {
      corpId: corpId*1,
      yeoshinId: ysId,
      yeoshinPassword: ysPw
    };
    setLoading(true);
    axios.post(GET_YS_CAT_URL, body, tokenHeader).then(res => {
      if(res.data.message === 'success'){
        setCategoryList(res.data.data);
      }
      else{
        alert('아이디나 비밀번호가 잘못되었습니다.');
        setYsId('');
        setYsPw('');
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    if(categoryList?.length === 1){
      setMergrpId(categoryList[0][0]);
    }
  }, [categoryList]);

  useEffect(() => {
    if(!mergrpId) return;
    const body = {
      corpId: corpId*1,
      yeoshinId: ysId,
      yeoshinPassword: ysPw,
      yeoshinMergrpid: mergrpId
    };
    axios.post(SYNC_YS_URL, body, tokenHeader).then(() => axios.post(SYNC_SALES_URL, { corpId: corpId*1 }, tokenHeader));
  }, [mergrpId]);

  return (
    !mergrpId ? 
    !categoryList ?
    <S.Content>
      <S.Text>매출액 연동하기</S.Text>
      <S.Input placeholder="아이디" value={ysId} onChange={e => setYsId(e.target.value)} />
      <S.Input placeholder="비밀번호" type="password" value={ysPw} onChange={e => setYsPw(e.target.value)} />
      <S.Button onClick={getYsCategory} error={loading}>{loading ? '연동 중..' : '연동하기'}</S.Button>
    </S.Content> :
    <S.Content>
      <S.Text>연동할 계정을 선택해주세요</S.Text>
      {categoryList.map((cat, i) => (
        <S.Cat onClick={() => setMergrpId(cat[0])} key={cat[0]}>{cat[1]}</S.Cat>
      ))}
    </S.Content> :
    <S.Content>
      <S.Text>계정 연동이 완료되었습니다</S.Text>
      <S.SubText>매출액 데이터 연동까지 2~30분 가량 소요됩니다.</S.SubText>
      <S.SubText>연동이 완료되면 매출 관련 페이지를 이용하실 수 있습니다.</S.SubText>
      <S.SubText>이후 매출은 자동으로 갱신되므로 추가 연동은 불필요합니다.</S.SubText>
      <S.ToHome onClick={() => navigate('/cid=' + corpId)}>홈으로 가기</S.ToHome>
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
  color: #1d1d1f;
`;

S.Text = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.Input = styled.input`
  width: 400px;
  padding: 15px;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  margin-bottom: 10px;
  &:focus{
    outline-color: #06c;
  }
`;

S.SignUp = styled.div`
  font-size: 14px;
  margin-top: 20px;
  color: #515154;
  display: flex;
`;

S.Blue = styled.div`
  color: #06c;
  margin-left: 5px;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
`;

S.Button = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
  border-radius: 5px;
  color: rgba(245, 245, 247, 0.8);
  background: #06c;
  border: none;
  ${props => !props.error ? '&:hover{cursor:pointer; color: #f5f5f7;}' : 'opacity: .3;'};
`;

S.SubText = styled.div`
  color: #515154;
  margin-bottom: 10px;
`;

S.ToHome = styled.div`
  margin-top: 30px;
  color: #06c;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
`;

S.Cat = styled.div`
  color: #515154;
  margin-bottom: 30px;
  opacity: .8;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  font-size: 18px;
`;