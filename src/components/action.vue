<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <span class="profile-pic image is-32x32">
            <img
              class="is-rounded"
              :src="assignedUser.avatar"
              alt="Friend
          avatar"
            />
          </span>
          <div>
            <span></span>
            <p class="action-text is-size-6 has-text-weight-bold">
              {{ action.title }}
              {{ action.expectedWorkHours | hoursEmoji }}
            </p>
            <p class="action-text is-size-7 has-text-weight-light">
              In progress: 8h : 32m
            </p>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="level-right is-size-7">
          <div class="level-item">
            <p
              @click="toggleStartPause"
              class="is-small is-pulled-right action-button"
            >
              <span class="icon is-small">
                <i v-if="action.isActive" class="fas fa-pause"></i>
                <i v-else class="fas fa-play"></i>
              </span>
            </p>
          </div>
          <div v-if="action.isActive" class="level-item">
            <p
              @click="finishTask"
              class="is-small is-pulled-right action-button"
            >
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import emojiStatus from '@/mixins/emojiStatus';
import { mapActions } from 'vuex';

export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  mixins: [emojiStatus],

  methods: {
    ...mapActions('actions', ['updateAction']),

    toggleStartPause() {
      if (!this.isStarted && !this.action.isFinished) {
        this.startAction();
      }

      if (this.isStarted && !this.action.isFinished) {
        this.action.isActive = !this.action.isActive;
      }

      this.$emit('actionStateChange', this.action);
    },

    finishTask() {
      if (this.isStarted && !this.action.isFinished) {
        this.$emit('actionFinished', this.action._id);
      }
    },

    async startAction() {
      const payload = {
        id: this.action['.key'],
        goalId: this.action.goalId,
        isActive: true,
        lastActivationTime: new Date(),
      };
      await this.updateAction(payload);
    },

    async assignPersonToAction() {
      const payload = {
        id: this.action['.key'],
        goalId: this.action.goalId,
        assignedUserId: this.a,
      };
      await this.updateAction(payload);
    },
  },

  computed: {
    isStarted() {
      return this.action.lastActivationTime !== undefined;
    },

    assignedUser() {
      return this.$store.state.users.items[this.action.assignedUserId];
    },
  },
};
</script>

<style scoped>
.action-text {
  overflow: hidden;
  padding: 0 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 50ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  display: none;
  opacity: 0;
}
</style>
