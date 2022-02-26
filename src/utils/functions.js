import { chartPalette } from "../styles/Colors";

export const applyColorToChart = (chartData, mode) => {
  chartData.datasets.forEach((element, index) => {
    element.borderColor = chartPalette[mode][index];
    element.backgroundColor = chartPalette[mode][index] + '33';
  })
  return chartData;
}