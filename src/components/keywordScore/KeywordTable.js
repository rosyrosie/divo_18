import styled from 'styled-components';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

export default function KeywordTable({ columns, data, onClick }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <S.TableStyle>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <S.Sort>&nbsp;<i className="fas fa-sort"></i></S.Sort>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => onClick(row)}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    { cell.render("Cell") }
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </S.TableStyle>
  );
}

const S = {};

S.TableStyle = styled.div`
  table{
    width: 100%;
    th, td{
      text-align: right;
      :first-child{
        text-align: left;
      }
    }
    th{
      padding: 0 10px 10px 10px;
    }
    td{
      padding: 10px;
    }
    thead{
      color: #515154;
    }
    tbody{
      color: #1d1d1f;
    }
    tbody tr:hover{
      cursor: pointer;
      background-color: #fafafa;
    }
  }
`;

S.Sort = styled.span`
  color: #d2d2d7;
  font-size: 10px;
  height: 100%;
`;