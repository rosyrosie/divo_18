import { useState } from 'react';
import styled from 'styled-components';
import ContentPublished from './ContentPublished';
import SearchQty from './SearchQty';
import UserStat from './UserStat';

export default function KeywordReport({ qtyRef, ctRef, userRef, mktRef }){
  return (
    <S.Column>
      <SearchQty qtyRef={qtyRef} />
      <ContentPublished ctRef={ctRef} />
      <UserStat userRef={userRef} />
    </S.Column>
  );
}

const S = {};

S.Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;