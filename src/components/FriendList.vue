<template>
  <div>
    <div class="level is-marginless">
      <div class="level-item level-right">
        <a
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
          class="edit-button"
        >
          <i class="fas fa-user-plus"></i>
        </a>
      </div>
    </div>
    <p class="is-size-5 has-text-weight-bold tile-title">Friends</p>
    <perfect-scrollbar>
      <ul class="menu menu-list">
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script>
import FriendListItem from '@/components/FriendListItem';
export default {
  name: 'FriendList',

  components: {
    FriendListItem,
  },

  data() {
    return {
      hovered: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.tile-title {
  margin: 0 0 1em 1em;
}
</style>
