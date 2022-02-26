import styled from 'styled-components';
import ContentPublished from '@/components/ContentPublished';
import SearchQty from '@/components/SearchQty';
import UserStat from '@/components/UserStat';
import KeywordRadar from '@/components/KeywordRadar';

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