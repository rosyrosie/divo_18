import { Chart as ChartJS, BarElement, CategoryScale, Filler, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import styled from "styled-components";
import Header from "../components/Header";
import LoginRequired from "../components/LoginRequired";

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

export default function Home(){
  return (
    <S.Body>
      <Header />
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1;
`;

S.Content = styled.div`
  flex: 1;
`;

