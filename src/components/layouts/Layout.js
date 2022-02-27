import styled from 'styled-components';
import Header from '@/components/layouts/Header';
import GlobalStyles from '@/styles/GlobalStyles';
import { Outlet } from 'react-router-dom';
import { Chart as ChartJS, BarElement, CategoryScale, Filler, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import Home from '../../routes/Home';

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
);

ChartJS.defaults.font.family = 'SUIT';
ChartJS.defaults.plugins.legend.labels.usePointStyle = true;

export default function Layout({ sticky = false }){
  return (
    <>
      <GlobalStyles />
      <S.Body>
        <Header sticky={sticky} />
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

