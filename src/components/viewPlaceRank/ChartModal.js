import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { lineOptions } from '@constants';
import { applyStyleToChart } from '@functions';

export default function ChartModal({ modalRef, setShowModal, chartKeyword, setChartKeyword, chartData }){
  const decreaseIndex = () => {
    if(chartKeyword.index === 0) return;
    setChartKeyword({ ...chartKeyword, index: chartKeyword.index-1 });
  };

  const increaseIndex = () => {
    if(chartKeyword.index === chartKeyword.list.length - 1) return;
    setChartKeyword({ ...chartKeyword, index: chartKeyword.index+1 });
  }

  return (
    <S.Body>
      <S.Modal ref={modalRef}>
        <S.Title>
          {chartKeyword.list?.[chartKeyword.index].keyword}
          <div onClick={() => setShowModal(false)}><i className="fas fa-times"></i></div>
        </S.Title>
        <S.ChartBox>
          <S.Arrow direction='left' onClick={decreaseIndex} inactive={chartKeyword.index === 0}>
            <i className="fas fa-angle-left"></i>
          </S.Arrow>
          <S.Chart>
            {chartData && <Line options={lineOptions('위', false, false, true, true)} data={applyStyleToChart(chartData, 'light')} />}
          </S.Chart>
          <S.Arrow direction='right' onClick={increaseIndex} inactive={chartKeyword.index === chartKeyword.list.length-1}>
            <i className="fas fa-angle-right"></i>
          </S.Arrow>
        </S.ChartBox>
      </S.Modal>
    </S.Body> 
  );
}

const S = {};

S.Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

S.Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #1d1d1f;
  font-size: 18px;
  font-weight: bold;
`;

S.ChartBox = styled.div`
  width: 50vw;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

S.Chart = styled.div`
  width: 90%;
`;

S.Arrow = styled.div`
  display: flex;
  justify-content: ${props => props.direction};
  align-items: center;
  flex: 1;
  font-size: 18px;
  &:hover{
    cursor: pointer;
  }
  ${props => props.inactive && 'visibility: hidden;'}
`;

S.Modal = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  flex-flow: column;
  padding: 30px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
`;