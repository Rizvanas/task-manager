export const inputDateFormat = 'YYY-MM-DD';
export const displayDateFormat = 'MMM DD YYYY';
export const displayTimeFormat = 'HH:mm';

export const getWorkHoursInEmoji = function(workHours) {
  let emoji = '🧁';
  if (workHours > 2 && workHours <= 4) {
    emoji = '😍';
  } else if (workHours > 4 && workHours <= 6) {
    emoji = '😨';
  } else if (workHours > 6 && workHours <= 8) {
    emoji = '😭';
  } else if (workHours > 8 && workHours <= 10) {
    emoji = '💩';
  } else if (workHours > 10) {
    emoji = '🚧';
  }
  return emoji;
};
