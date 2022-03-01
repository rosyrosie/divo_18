import styled from 'styled-components';
import CommentSection from '@/components/keywordAnalysis/CommentSection';
import SectionOrder from '@/components/keywordAnalysis/SectionOrder';
import { useState, useMemo } from 'react';
import { KA_VIEW_URL, KA_RELATIVE_URL } from '@api';
import { sortComma } from '@functions';
import { useParams } from 'react-router-dom';
import { useFetch } from '@hooks';
import { useTable, useGlobalFilter, useSortBy } from "react-table"
import ViewTable from '@/components/keywordAnalysis/ViewTable';
import RelTable from '@/components/keywordAnalysis/RelTable';
import Loading from '@/components/Loading';

const miComment = {
  title: '마케팅 데이터',
  details: [
    '네이버 색션 배치 순서, View 검색결과, 연관검색어 등 키워드 마케팅에 필요한 정보를 제공합니다'
  ]
};

const keywordCols = [
  {
    accessor: 'keyword',
    Header: '키워드'
  },
  {
    accessor: 'pcSearch',
    Header: '월간 검색량(PC)',
    sortType: sortComma
  }, 
  {
    accessor: 'mobileSearch',
    Header: '월간 검색량(Mobile)',
    sortType: sortComma
  },
  {
    accessor: 'totalSearch',
    Header: '월간 검색량(전체)',
    sortType: sortComma
  },
  {
    accessor: 'totalBlog',
    Header: '월간 블로그 발행량',
    sortType: sortComma
  },
];

const viewCols = [
  {
    accessor: 'rank',
    Header: '순위'
  },
  {
    accessor: 'type',
    Header: '유형'
  }, 
  {
    accessor: 'author',
    Header: '작성자'
  },
  {
    accessor: 'title',
    Header: '제목'
  },
  {
    accessor: 'date',
    Header: '콘텐츠 발행일'
  },
  {
    accessor: 'visitor',
    Header: '방문자 수'
  }
];

export default function MarketingIndex({ mktRef }){
  const [ tab, setTab ] = useState(0);
  const { keyword } = useParams();

  const { payload: viewData, loading: viewLoading, error: viewError } = useFetch(
    KA_VIEW_URL + keyword,
    null,
    'GET',
    [keyword]
  );

  const { payload: relData, loading: relLoading, error: relError } = useFetch(
    KA_RELATIVE_URL + keyword,
    null,
    'GET',
    [keyword]
  );

  const columns = useMemo(() => tab ? keywordCols : viewCols, [tab]);
  const data = useMemo(() => (!tab ? viewData?.data.slice(0, 10) : relData?.data) || [], [tab, keyword]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <S.Flex ref={mktRef} id="mkt-index">
      <CommentSection comment={miComment} />
      <SectionOrder />
      <S.Section color={'#f5f5f7'}>
        <S.Box>
          <S.Tabs>
            <S.Tab onClick={() => setTab(0)} isSelected={tab===0}>View 검색결과</S.Tab>
            <S.Tab onClick={() => setTab(1)} isSelected={tab===1}>연관검색어</S.Tab>
          </S.Tabs>
          {!(viewLoading || relLoading) ? 
          <S.Table>
            {!tab ? 
              <ViewTable 
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
                setGlobalFilter={setGlobalFilter} 
              /> :
              <RelTable 
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
                setGlobalFilter={setGlobalFilter} 
              />
            }
          </S.Table> : 
          <Loading />}
        </S.Box>
      </S.Section>
    </S.Flex>

  );
}

const S = {};

S.Flex = styled.div`
  display: flex;
  flex-flow: column;
`;

S.Section = styled.div`
  width: 100%;
  ${props => `background: ${props.color};`}
  display: flex;
  justify-content: center;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Box = styled.div`
  width: 60%;
  max-width: 1200px;
  background: white;
  margin: 40px 0;
  display: flex;
  flex-flow: column;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  justify-content: center;
  align-items: center;
`;

S.Tabs = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

S.Tab = styled.div`
  padding: 15px 10px;
  margin: 0 10px;
  color: #1d1d1f;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    opacity: 1;
    cursor: pointer;
    font-weight: bold;
  }
  ${props => props.isSelected ? 'opacity: 1; border-bottom: 1px solid #1d1d1f; font-weight: bold;' : ''}
`;

S.Table = styled.div`
  overflow-y: auto;
  max-height: 500px;
  width: 100%;
  padding: 0 5px;
`;