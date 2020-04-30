import { differenceInDays } from 'date-fns';
import { timeStamp } from '@/shared/firebase';

export default {
  computed: {
    completionDate: {
      set(date) {
        this.goal.completionDate = timeStamp.fromDate(date);
        this.update();
      },

      get() {
        return this.goal.completionDate.toDate();
      },
    },

    daysLeft() {
      return differenceInDays(this.completionDate, new Date());
    },
  },
};
