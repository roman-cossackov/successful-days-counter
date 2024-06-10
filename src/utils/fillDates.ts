import { getShortStringFromDate } from "./getStringFromDate";

type Data = {
  [key: string]: boolean;
};

export const fillDates = (obj: Data) => {
  const today = new Date();
  const formattedToday = getShortStringFromDate(today);

  const dates = Object.keys(obj).map(date => {
    const [month, day, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day);
  });

  const timestamps = dates.map(date => date.getTime());
  const maxTimestamp = Math.max(...timestamps);
  const lastDate = new Date(maxTimestamp);
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
};
