import styled from 'styled-components'

export default function RelTable({ getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }) {
  return (
    <S.TableContainer {...getTableProps()} align="center">
      <S.Thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, idx) => (
              <S.Th {...column.getHeaderProps(column.getSortByToggleProps())} idx={idx}>
                {column.render("Header")}
                <S.Sort><i className="fas fa-sort"></i></S.Sort>
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
                <S.Td {...cell.getCellProps()} i={idx}>
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
  ${props => !props.i ? 'width: 250px; min-width: 250px;' : ''}
`;

S.Tbody = styled.tbody`
  font-weight: normal;
  font-size: 12px;
`;