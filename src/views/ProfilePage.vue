<template>
  <section v-if="profile" class="section">
    <div class="tile is-ancestor">
      <div class="tile is-8 is-vertical is-fullheight">
        <div class="tile">
          <div class="tile is-vertical is-parent">
            <article class="tile editable-tile is-child box has-shadow-border">
              <div class="level is-marginless">
                <div class="level-item level-right">
                  <a class="edit-button">
                    <span class="edit-icon">
                      <i class="fas fa-pen"></i>
                    </span>
                  </a>
                </div>
              </div>
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96 profile-pic">
                    <img
                      class="is-rounded"
                      :src="profile.avatar"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-5">{{ profile.username }}</p>
                  <p class="subtitle profile-subtitle is-size-7">
                    <span class="icon is-small has-text-right">
                      <i class="fas fa-envelope"></i>
                    </span>
                    {{ profile.email }}
                  </p>
                  <p class="is-size-7">
                    Esu rizvanas ir darau dalykus programavima lalala nobody
                    cares
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box has-shadow-border">
              <div class="columns is-centered is-multiline has-text-centered">
                <div class="column">
                  <div class="goal-card-stat">
                    <p class="subtitle is-size-5 is-marginless">🧊</p>
                    <p class="is-size-7 has-text-weight-bold">Actions Active</p>
                  </div>
                </div>
                <div class="column">
                  <div class="goal-card-stat">
                    <p class="subtitle is-size-5 is-marginless">100</p>
                    <p class="is-size-7 has-text-weight-bold">Finished</p>
                  </div>
                </div>
                <div class="column">
                  <div class="goal-card-stat">
                    <p class="subtitle is-size-5 is-marginless">🚀</p>
                    <p class="is-size-7 has-text-weight-bold">Productivity</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box has-shadow-border">
            <p class="is-size-5 has-text-weight-bold tile-title">Actions</p>
            <ActivityChart :height="200" />
          </article>
        </div>
      </div>
      <div class="tile is-parent fits-screen-height">
        <div class="tile editable-tile is-child box has-shadow-border">
          <FriendList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ActivityChart from '@/components/activity-chart';
import FriendList from '@/components/FriendList';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'ProfilePage',

  components: {
    ActivityChart,
    FriendList,
  },

  data() {
    return {
      editUsername: false,
      editEmail: false,
    };
  },

  mixins: [asyncDataStatus],

  computed: {
    profile() {
      return this.$store.state.auth.authUser;
    },
  },

  methods: {
    ...mapActions('friends', ['bindToUserFriends', 'unbindUserFriends']),
    saveChanges() {},
  },

  async created() {
    await this.bindToUserFriends(this.profile['.key']);
    this.asyncDataStatus_fetched();
  },

  beforeDestroy() {
    this.unbindUserFriends();
  },
};
</script>

<style lang="scss" scoped>
.profile-pic {
  margin-right: 0.75em;
}

.is-vertical-center {
  display: flex;
  align-items: center;
}

.profile-subtitle {
  margin-bottom: 0.75em;
}

.tile-title {
  margin: 0 0 1em 1em;
}
</style>
