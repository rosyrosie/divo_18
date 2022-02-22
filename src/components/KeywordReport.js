import { useState } from 'react';
import styled from 'styled-components';
import ContentPublished from './ContentPublished';
import SearchQty from './SearchQty';
import UserStat from './UserStat';

export default function KeywordReport(){
  return (
    <S.Column>
      <SearchQty />
      <ContentPublished />
      <UserStat />
    </S.Column>
  );
}

const S = {};

S.Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;