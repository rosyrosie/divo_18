import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import LoginRequired from '../components/LoginRequired';
import { ADDCORP_URL, FINDPLACE_URL } from '../environments/Api';
import { useFetch } from '../environments/Hooks';

export default function CorpAddition(){
  const token = localStorage.getItem('token');
  const [ input, setInput ] = useState('');
  const [ query, setQuery ] = useState(null);
  const { payload, error } = useFetch(
    FINDPLACE_URL + query,
    null,
    'GET',
    [query],
    query
  );

  const navigate =  useNavigate();
  const corpList = payload?.corpInfo;

  const getCorpList = e => {
    if(e.key !== 'Enter') return;
    setQuery(input);
  }

  const addCorp = (id, name) => {
    const body = {
      placeId: id,
      corpName: name
    };
    const tokenHeader = token ? {headers: {"Authorization": `Token ${token}`}} : null;
    axios.post(ADDCORP_URL, body, tokenHeader).then(res => {
      if(res.data.message==='success'){
        alert('브랜드가 추가되었습니다.');
        navigate(`/cid=${res.data.corpId}`);
      }
      else{
        alert('이미 사용 중인 브랜드입니다.');
      }
    });
  }

  const noCorps = query && !corpList.length;

  if(!token) return (
    <S.Body>
      <Header />
      <LoginRequired />
    </S.Body>
  );

  return (
    <S.Body>
      <Header />
      <S.Content>
        <S.Text>브랜드 추가</S.Text>
        <S.Input placeholder="추가할 브랜드를 입력하세요" value={input} onChange={e => setInput(e.target.value)} onKeyPress={getCorpList} />
        <S.CorpBox>
          {corpList?.map((corp, i) => (
            <S.Corp index={i} onClick={() => addCorp(corp.id, corp.name)}>
              <S.Name>{corp.name}</S.Name>
              <S.Adr>{corp.address}</S.Adr>
            </S.Corp>
          ))}
        </S.CorpBox>
        {noCorps && <S.NoCorp>검색된 브랜드가 없습니다</S.NoCorp>}
      </S.Content>
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1;
`;

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #1d1d1f;
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

S.Corp = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;
  ${props => props.index ? 'border-top: 1px solid #d2d2d7;' : ''}
  opacity: .8;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
`;

S.Text = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.CorpBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 20px;
  padding-right: 5px;
`;

S.Name = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

S.Adr = styled.div`
  color: #515154;
  font-size: 14px;
`;

S.NoCorp = styled.div`
  font-size: 14px;
  color: #de071c;
`;