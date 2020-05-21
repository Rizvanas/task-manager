export default {
  name: 'ActionMixins',
  computed: {
    isStarted() {
      return this.action.lastActivationTime !== undefined;
    },

    clonedAction() {
      return { ...this.action, id: this.action.id };
    },

    actionSub() {
      const subtitle = this.action.isActive ? 'In progress ' : 'Paused: ';
      return `${subtitle} ${this.timeSpent}`;
    },

    timeSpent() {
      const seconds = this.clonedAction.timeTaken;
      const hours = Math.trunc(seconds / 3600);
      const minutes = Math.trunc((seconds % 3600) / 60);
      return hours === 0 ? `${minutes} m` : `${hours}h ${minutes}m`;
    },
  },
};
