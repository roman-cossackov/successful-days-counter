import { getShortStringFromDate } from "./getStringFromDate";

export const fillDates = (obj) => {

  const today = new Date();
  const formattedToday = getShortStringFromDate(today);

  const dates = Object.keys(obj).map(date => {
    const [month, day, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day);
  });

  const lastDate = new Date(Math.max.apply(null, dates));
  let currentDate = new Date(lastDate);

  while (getShortStringFromDate(currentDate) !== formattedToday) {
    currentDate.setDate(currentDate.getDate() + 1);
    const formattedDate = getShortStringFromDate(currentDate);
    if (!obj[formattedDate]) {
      obj[formattedDate] = false;
    }
  }

  if (!obj[formattedToday]) {
    obj[formattedToday] = false;
  }

  return obj;
}
