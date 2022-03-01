import styled from 'styled-components';
import CommentSection from '@/components/keywordAnalysis/CommentSection';
import SectionOrder from '@/components/keywordAnalysis/SectionOrder';
import TableBox from '@/components/keywordAnalysis/TableBox';
import { marketIndexComment } from '@constants';

export default function MarketingIndex({ mktRef }){
  return (
    <S.Flex ref={mktRef} id="mkt-index">
      <CommentSection comment={marketIndexComment} />
      <SectionOrder />
      <TableBox />
    </S.Flex>
  );
}

const S = {};

S.Flex = styled.div`
  display: flex;
  flex-flow: column;
`;