type Data = {
  [key: string]: boolean;
};

export const countLastTrueStreak = (data: Data) => {
  const dates = Object.keys(data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  let streak = 0;
  let foundFalse = false;

  for (let i = dates.length - 1; i >= 0; i--) {
    if (data[dates[i]]) {
      if (!foundFalse) {
        streak++;
      }
    } else {
      foundFalse = true;
    }
  }

  return streak;
}