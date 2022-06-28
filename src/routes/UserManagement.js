import { USER_LIST_URL, USER_TOGGLE_URL } from "@api";
import { useFetch } from "@hooks";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function UserManagement(){
  const [ trigger, setTrigger ] = useState(false);
  const { payload: userList } = useFetch(
    USER_LIST_URL,
    null,
    'GET',
    [trigger]
  );

  const onChange = (email) => {
    let token = localStorage.getItem('token');
    axios.get(USER_TOGGLE_URL+email, {headers: {"Authorization": `Token ${token}`}}).then(res => setTrigger(t => !t));
  }

  console.log(userList);

  return (
    <S.Content>
      <S.Table>
        <colgroup>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "150px" }}></col>
        </colgroup>
        <tbody>
          {
            userList?.approvedUser?.map(user => (
              <tr>
                <S.Th>이메일</S.Th>
                <S.Td>{user.email}</S.Td>
                <S.Th>닉네임</S.Th>
                <S.Td>{user.username}</S.Td>
                <S.Th>관리 브랜드</S.Th>
                <S.Td>{user.corporations.map(corp => corp)}</S.Td>
                <S.Th>상권시스템 권한</S.Th>
                <S.Td onChange={() => onChange(user.email)}><input type="checkbox" checked/></S.Td>
              </tr>
            ))
          }
        </tbody>
      </S.Table>
      <S.Blank />
      <S.Table>
        <colgroup>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "150px" }}></col>
        </colgroup>
        <tbody>
          {
            userList?.disapprovedUser?.map(user => (
              <tr>
                <S.Th>이메일</S.Th>
                <S.Td>{user.email}</S.Td>
                <S.Th>닉네임</S.Th>
                <S.Td>{user.username}</S.Td>
                <S.Th>관리 브랜드</S.Th>
                <S.Td>{user.corporations.map(corp => corp)}</S.Td>
                <S.Th>상권시스템 권한</S.Th>
                <S.Td onChange={() => onChange(user.email)}><input type="checkbox" checked={false} /></S.Td>
              </tr>
            ))
          }
        </tbody>
      </S.Table>
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

S.Blank = styled.div`
  width: 1170px;
  border-top: 1px solid #d2d2d7;
  margin: 48px 0;
`;

S.Table = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

S.Td = styled.td`
  padding: 12px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
  color: #515154;
`;

S.Th = styled.th`
  font-weight: bold;
  color: #1d1d1f;
  padding: 0 5px;
`;