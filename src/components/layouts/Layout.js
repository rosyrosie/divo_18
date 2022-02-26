import styled from 'styled-components';
import Header from '@/components/layouts/Header';
import GlobalStyles from '@/styles/GlobalStyles';
import { Outlet } from 'react-router-dom';

export default function Layout(){
  return (
    <>
      <GlobalStyles />
      <S.Body>
        <Header />
        <Outlet />
      </S.Body>
    </>
  );
}

const S = {};

S.Body = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1;
`;

