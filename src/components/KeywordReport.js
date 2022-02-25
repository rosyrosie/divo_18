import { useState } from 'react';
import styled from 'styled-components';
import ContentPublished from './ContentPublished';
import SearchQty from './SearchQty';
import UserStat from './UserStat';
import MarketingIndex from './MarketingIndex';
import KeywordRadar from './KeywordRadar';

export default function KeywordReport({ evalRef, qtyRef, qtyInView, ctRef, ctInView, userRef, userInView, mktRef }){
  return (
    <S.Column>
      <KeywordRadar evalRef={evalRef} />
      <SearchQty qtyRef={qtyRef} qtyInView={qtyInView} />
      <ContentPublished ctRef={ctRef} ctInView={ctInView} />
      <UserStat userRef={userRef} userInView={userInView} />
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