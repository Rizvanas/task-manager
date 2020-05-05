export default {
  computed: {
    actionsLeftHeading() {
      const title = this.actionsLeft === 1 ? 'Action' : 'Actions';
      return `${title} left`;
    },

    actionsFinishedHeading() {
      const title = this.actionsFinished === 1 ? 'Action' : 'Actions';
      return `${title} finished`;
    },

    daysLeftHeading() {
      const title = this.daysLeft === 1 ? 'Day' : 'Days';
      return `${title} left`;
    },

    actionsFinished() {
      return this.goal.actionsFinished;
    },

    actionsLeft() {
      return this.goal.totalActions - this.goal.actionsFinished;
    },
  },
};
