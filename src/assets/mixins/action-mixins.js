import { getWorkHoursInEmoji } from '../shared/constants';

export default {
  computed: {
    currentActionEmoji: function() {
      return getWorkHoursInEmoji(this.clonedAction.workHours);
    },
  },
};
