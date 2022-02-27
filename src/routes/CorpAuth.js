import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CORP_AUTH_URL } from '@api';
import { useFetch } from '@hooks';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function CorpAuth(){
  const { corpId } = useParams();
  const { payload, error } = useFetch(
    CORP_AUTH_URL + corpId,
    null,
    'GET'
  );
  const trigger = useRef(null);

  const [ userList, setUserList ] = useState([]);
  useEffect(() => setUserList(payload?.permissionList), [payload]);

  const [ email, setEmail ] = useState('');
  const [ tier, setTier ] = useState('');

  const addUser = (email, tier) => {
    trigger.current = true;
    setUserList(list => [...list, { email: email, level: tier*1 }]);
  };

  const deleteUser = i => {
    trigger.current = true;
    setUserList(list => list.filter((value, index) => index !== i));
  }

  useEffect(() => {
    if(!trigger.current) return;
    const body = {
      corpId: corpId,
      permissionList: userList
    };
    const token = localStorage.getItem('token');
    const tokenHeader = token ? {headers: {"Authorization": `Token ${token}`}} : null;
    axios.post(CORP_AUTH_URL + corpId, body, tokenHeader).then(res => console.log(res)).then(() => trigger.current = false).then(() => window.location.reload());
  }, [userList]);
  
  return (
    <S.Content>
      {userList?.map((user, i) => (
        <S.Flex key={i}>
          <S.Mail>{user.email}</S.Mail>
          <S.Name>{user.userName}</S.Name>
          <S.Tier>{user.level}</S.Tier>
          <S.Delete i={i} onClick={() => deleteUser(i)}>{i ? '삭제' : ''}</S.Delete>
        </S.Flex>
      ))}
       <S.Flex>
          <S.IMail value={email} placeholder={"이메일"} onChange={e => setEmail(e.target.value)}/>
          <S.ITier value={tier} placeholder={"권한"} onChange={e => setTier(e.target.value)}/>
          <S.Delete onClick={() => addUser(email, tier)}>추가</S.Delete>
        </S.Flex>
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

S.Flex = styled.div`
  display: flex;
  margin-bottom: 20px;
  color: #1d1d1f;
`;

S.Mail = styled.div`
  border-right: 1px solid #d2d2d7;
  width: 250px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`;

S.Name = styled.div`
  border-right: 1px solid #d2d2d7;
  width: 120px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`;

S.Tier = styled.div`
  width: 100px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`;

S.IMail = styled.input`
  border: none;
  border-right: 1px solid #d2d2d7;
  width: 250px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  &:focus{
    outline-color: #06c;
  }
`;

S.ITier = styled.input`
  border: none;
  width: 100px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  &:focus{
    outline-color: #06c;
  }
`;


S.Delete = styled.div`
  width: 80px;
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  color: #de071c;
  opacity: .8;
  ${props => props.i===0 ? '' : '&:hover{ cursor: pointer; opacity: 1; }'};
  }
`;