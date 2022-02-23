import { useState } from 'react';
import styled from 'styled-components';
import ContentPublished from './ContentPublished';
import SearchQty from './SearchQty';
import UserStat from './UserStat';
import MarketingIndex from './MarketingIndex';
import KeywordRadar from './KeywordRadar';

export default function KeywordReport({ evalRef, qtyRef, ctRef, userRef, mktRef }){
  return (
    <S.Column>
      <KeywordRadar evalRef={evalRef} />
      <SearchQty qtyRef={qtyRef} />
      <ContentPublished ctRef={ctRef} />
      <UserStat userRef={userRef} />
      {/* <MarketingIndex mktRef={mktRef} /> */}
    </S.Column>
  );
}

const S = {};

S.Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;