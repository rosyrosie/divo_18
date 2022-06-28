import { USER_LIST_URL } from "@api";
import { useFetch } from "@hooks";
import styled from "styled-components";

export default function UserManagement(){
  const { payload: userList } = useFetch(
    USER_LIST_URL,
    null,
    'GET',
    []
  );

  console.log(userList);

  return (
    <S.Content>
      <S.Table>
        <colgroup>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "150px" }}></col>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "150px" }}></col>
          <col style={{ width: "100px" }}></col>
          <col style={{ width: "200px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "150px" }}></col>
        </colgroup>
        <tbody>
          {
            userList?.data?.map(user => (
              <tr>
                <S.Th>이메일</S.Th>
                <S.Td>{user.email}</S.Td>
                <S.Th>닉네임</S.Th>
                <S.Td>{user.username}</S.Td>
                <S.Th>관리 브랜드</S.Th>
                <S.Td>{user.corporations.map(corp => corp)}</S.Td>
                <S.Th>상권시스템 권한</S.Th>
                <S.Td><input type="checkbox" /></S.Td>
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

S.Table = styled.div`
  max-height: 600px;
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