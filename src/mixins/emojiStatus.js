import { addSeconds, differenceInDays } from 'date-fns';

export default {
  filters: {
    hoursEmoji: seconds => {
      const hour = val => val * 3600;

      let emoji = '👶';
      if (seconds > hour(2) && seconds <= hour(3)) {
        emoji = '🧁';
      } else if (seconds > hour(3) && seconds <= hour(4)) {
        emoji = '🍰';
      } else if (seconds > hour(4) && seconds <= hour(5)) {
        emoji = '😍';
      } else if (seconds > hour(5) && seconds <= hour(6)) {
        emoji = '😃';
      } else if (seconds > hour(6) && seconds <= hour(7)) {
        emoji = '😐';
      } else if (seconds > hour(7) && seconds <= hour(8)) {
        emoji = '😨';
      } else if (seconds > hour(8) && seconds <= hour(9)) {
        emoji = '😭';
      } else if (seconds > hour(9) && seconds <= hour(10)) {
        emoji = '💩';
      } else if (seconds > hour(10)) {
        emoji = '🚧';
      }
      return emoji;
    },

    urgencyEmoji: (expected, finished, completionDate) => {
      const timeLeft = expected - finished;
      const projectedCompletionDate = addSeconds(new Date(), timeLeft);
      const diff = differenceInDays(completionDate, projectedCompletionDate);

      let emoji = '🧊';
      if (diff < 7 && diff >= 2) {
        emoji = '🌊';
      } else if (diff < 2 && diff >= 0) {
        emoji = '🔥';
      } else if (diff < 0) {
        emoji = '💥';
      }

      return emoji;
    },
  },
};
