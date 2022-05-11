import { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import styled from 'styled-components';
import { systemCols, csvHeader } from "@constants";
import { CSVLink } from "react-csv";

export default function Table({ data, setPopupCode }){
  const columns = useMemo(
    () => systemCols
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useSortBy, usePagination);

  return (
    <S.Table>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} onClick={() => {cell.column.id === 'region' && setPopupCode(cell.row.original.regionCode)}}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <S.BottomBar>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{'  '}
          <S.Page>
            <strong>
              {pageIndex + 1} / {pageOptions.length} 페이지
            </strong>{' '}
          </S.Page>
          <span>
            | {' '}
            <S.PageInput
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
            />
            {' '}페이지로 이동
          </span>{' '} | {' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}개씩 보기
              </option>
            ))}
          </select>
        </div>
        <CSVLink data={data} headers={csvHeader} filename={"상권통계.csv"}><button>CSV 다운받기</button></CSVLink>
      </S.BottomBar>
     
    </S.Table>
  );
}

const S = {};

S.BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

S.PageInput = styled.input`
  width: 50px;
`;

S.Page = styled.span`
  margin: 0 10px;
`;

S.Table = styled.div`
  padding: 1rem;

  font-size: 12px;

  table {
    border-spacing: 0;
    border: 1px solid #515154;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tbody{
      text-align: right;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #515154;
      border-right: 1px solid #515154;

      :last-child {
        border-right: 0;
      }
    }
  }
`;