import { chartPalette } from "../styles/Colors";
import { addDays } from 'date-fns';

//chart functions
export const applyColorToChart = (chartData, mode) => {
  chartData?.datasets?.forEach((element, index) => {
    element.borderColor = chartPalette[mode][index] + 'ff';
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

export const lastMonthDay = () => {
  let today = new Date();
  today.setDate(0);
  return today;
}

//section order
export const createSectionOrderString = (orderList) => {
  let string = '';
  for(var i=0; i<orderList.slice(0, 10).length; i++){
    string += orderList[i];
    if(i < Math.min(orderList.length-1, 9)) string += ' > ';
  }
  return string;
}

//table
export const sortComma = (rowA, rowB, id, desc) => {
  let a = rowA.values[id].replaceAll(',', '');
  let b = rowB.values[id].replaceAll(',', '');
  if(a === '< 10') a = 9;
  if(b === '< 10') b = 9;
  if(Number(a) > Number(b)) return 1;
  if(Number(a) < Number(b)) return -1;
  return 0;
};