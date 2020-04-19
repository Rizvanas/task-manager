import { getWorkHoursInEmoji } from '@/shared/constants';

export default {
  name: 'ActionMixins',
  computed: {
    currentActionEmoji: function() {
      return getWorkHoursInEmoji(this.clonedAction.expectedHours);
    },
  },
};
