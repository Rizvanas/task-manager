export default {
  filters: {
    hoursEmoji: function(workHours) {
      let emoji = '👶';
      if (workHours > 2 && workHours <= 3) {
        emoji = '🧁';
      } else if (workHours > 3 && workHours <= 4) {
        emoji = '🍰';
      } else if (workHours > 4 && workHours <= 5) {
        emoji = '😍';
      } else if (workHours > 5 && workHours <= 6) {
        emoji = '😃';
      } else if (workHours > 6 && workHours <= 7) {
        emoji = '😐';
      } else if (workHours > 7 && workHours <= 8) {
        emoji = '😨';
      } else if (workHours > 8 && workHours <= 9) {
        emoji = '😭';
      } else if (workHours > 9 && workHours <= 10) {
        emoji = '💩';
      } else if (workHours > 10) {
        emoji = '🚧';
      }
      return emoji;
    },
  },
};
