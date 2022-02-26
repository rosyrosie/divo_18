import { Chart as ChartJS, BarElement, CategoryScale, Filler, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from '@hooks';
import { CORPLIST_URL } from "@api";

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
  const { corpId } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { payload, error } = useFetch(
    CORPLIST_URL,
    null,
    'GET',
    [],
    token
  );

  if(!corpId && token && payload?.corpList) navigate('/cid=' + payload?.corpList?.[0]?.[0]);

  return (
    <S.Content></S.Content>
  );
}

const S = {};

S.Content = styled.div`
  flex: 1;
  background: rgba(225, 225, 227, 0.7);
`;

