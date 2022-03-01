import styled from 'styled-components'

export default function ViewTable({ getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }) {
  return (
    <S.TableContainer {...getTableProps()} align="center">
      <S.Thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, idx) => (
              <S.Th idx={idx}>
                {column.render("Header")}
              </S.Th>
            ))}
          </tr>
        ))}
      </S.Thead>
      <S.Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, idx) => (
                <S.Td {...cell.getCellProps()} i={idx} key={idx}>
                  {cell.render("Cell")}
                </S.Td>
              ))}
            </tr>
          );
        })}
      </S.Tbody>
    </S.TableContainer>
  );
}

const S = {};

S.Thead = styled.thead`
  top: 0;
  positon: -webkit-sticky;
  position: sticky;
  box-shadow: inset 0 -1px 0 #d2d2d7;
  background: white;
  font-weight: bold;
  height: 60px;
  color: #1d1d1f;
`;

S.Sort = styled.span`
  padding-left: 5px;
  height: 100%;
  font-size: 12px;
`;

S.TableContainer = styled.table`
  width: 100%;
  text-align: right;
  border-collapse: collapse;
  height: 100%;
`;

S.Th = styled.th`
  padding: 15px 20px;
  vertical-align: middle;
  font-size: 12px;
`;

S.Td = styled.td`
  padding: 15px 20px;
  box-shadow: inset 0 -1px 0 #d2d2d7;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #515154;
  ${props => !props.i ? 'width: 61px; min-width: 61px;' : ''}
  ${props => props.i===1 ? 'width: 77px; min-width: 77px;' : ''}
  ${props => props.i===4 ? 'width: 114px; min-width: 114px;' : ''}
  ${props => props.i===5 ? 'width: 91px; min-width: 91px;' : ''}
`;

S.Tbody = styled.tbody`
  font-weight: normal;
  font-size: 12px;
`;