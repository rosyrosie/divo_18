import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ADD_CORP_URL, FIND_PLACE_URL, MAKE_PLACE_URL } from '@api';
import { useFetch } from '@hooks';

export default function CorpAddition(){
  const token = localStorage.getItem('token');
  const tokenHeader = token ? {headers: {"Authorization": `Token ${token}`}} : null;
  const [ input, setInput ] = useState('');
  const [ query, setQuery ] = useState(null);
  const { payload, error } = useFetch(
    FIND_PLACE_URL + query,
    null,
    'GET',
    [query],
    query
  );

  const navigate =  useNavigate();
  const corpList = payload?.corpInfo;
  const isNewPlace = !(payload?.already);

  const getCorpList = e => {
    if(e.key !== 'Enter') return;
    setQuery(input);
  }

  const addCorp = (id, name) => {
    if(!window.confirm('각 매장은 한 번 선택 시 다른 사용자가 선택할 수 없습니다.\n본인과 무관한 매장을 선택할 시 제제가 이루어질 수 있습니다.\n해당 매장을 선택하시겠습니까?')) return;
    const body = {
      placeId: id,
      corpName: name
    };
    axios.post(ADD_CORP_URL, body, tokenHeader).then(res => {
      if(res.data.message==='success'){
        alert('브랜드가 추가되었습니다.');
        navigate(`/cid=${res.data.corpId}`);
      }
      else{
        console.log(res);
        alert('이미 사용 중인 브랜드입니다.');
      }
    });
  }

  const addNewCorp = (corp) => {
    axios.post(MAKE_PLACE_URL, corp, tokenHeader).then(res => {
      if(res.data.message === 'success'){
        addCorp(res.data.id, corp.name);
      }
    });
  }

  const noCorps = query && !corpList?.length && corpList;

  return (
    <S.Content>
      <S.Text>브랜드 추가</S.Text>
      <S.Input placeholder="추가할 브랜드를 입력하세요" value={input} onChange={e => setInput(e.target.value)} onKeyPress={getCorpList} />
      <S.CorpBox>
        {corpList?.map((corp, i) => (
          <S.Corp index={i} onClick={() => isNewPlace ? addNewCorp(corp) :addCorp(corp.id, corp.name)} key={corp.id}>
            <S.Name>{corp.name}</S.Name>
            <S.Adr>{corp.address}</S.Adr>
          </S.Corp>
        ))}
      </S.CorpBox>
      {noCorps && <S.NoCorp>검색된 브랜드가 없습니다</S.NoCorp>}
      <S.Tip>찾으시는 브랜드가 없을 시 더 자세한 브랜드명을 검색해주세요</S.Tip>
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

S.Tip = styled.div`
  color: #515154;
  font-size: 14px;
  margin-top: 40px;
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
  width: 400px;
`;

S.Text = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

S.CorpBox = styled.div`
  max-height: 320px;
  overflow-y: auto;
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