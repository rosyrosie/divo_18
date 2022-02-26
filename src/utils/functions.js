import { chartPalette } from "../styles/Colors";
import { addDays } from 'date-fns';

export const applyColorToChart = (chartData, mode) => {
  chartData?.datasets?.forEach((element, index) => {
    element.borderColor = chartPalette[mode][index];
    element.backgroundColor = chartPalette[mode][index] + '33';
  })
  return chartData;
}

//date functions
const toThursday = (date) => {
  return addDays(date, date.getDay() ? 4-date.getDay() : -3)
}

const getMonthWeek = (date) => {
  const thursday = toThursday(date)
  var [ day, month, year ] = [ thursday.getDate(), thursday.getMonth()+1, thursday.getFullYear() ]
  if(month < 10){
    month = '0' + month;
  }
  return `${year}-${month} ${Math.floor((day+6)/7)}주차`
}

export const dateToString = (date, scale = 0) => {
  let [ year, month, day ] = [ date.getFullYear(), date.getMonth()+1, date.getDate() ]
  if(month < 10){
    month = '0' + month;
  }
  if(day < 10){
    day = '0' + day;
  }
  switch(scale){
    case 0:
      return `${year}-${month}-${day}`;
    case 1:
      return getMonthWeek(date);
    case 2:
      return `${year}-${month}`;
    case 3:
      return year;
    default:
      break;
  }
}