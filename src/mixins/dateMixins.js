import { differenceInDays } from 'date-fns';

export default {
  computed: {
    completionDate() {
      return this.goal.completionDate.toDate();
    },

    daysLeft() {
      return differenceInDays(this.completionDate, new Date());
    },
  },
};
