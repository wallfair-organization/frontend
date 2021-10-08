export const calculateTimeLeft = date => {
  if (!date) {
    return null;
  }

  const difference = date - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export const nextDayweek = (d, weekday, time) => {
  d.setDate(d.getDate() + ((weekday + (7 - d.getDay())) % 7));
  d.setUTCHours(time.hour, time.minute, time.second);
  return d;
};
