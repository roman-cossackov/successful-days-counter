type Data = {
  [key: string]: boolean;
};

export const countMaxTrueStreak = (data: Data): number => {
  const dates = Object.keys(data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < dates.length; i++) {
    if (data[dates[i]]) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
};
