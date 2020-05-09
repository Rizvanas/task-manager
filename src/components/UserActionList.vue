<template>
  <div>
    <div class="level is-marginless">
      <div class="level-left level-item">
        <p class="is-size-5 has-text-weight-bold tile-title">Actions</p>
      </div>
    </div>
    <perfect-scrollbar :options="options">
      <ul class="menu menu-list">
        <transition-group name="list" tag="li">
          <li v-for="action in actions" :key="action.id">
            <p class="action">
              <transition name="fade">
                <UserActionItem :action="action" />
              </transition>
            </p>
          </li>
        </transition-group>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script>
import UserActionItem from '@/components/UserActionItem';

export default {
  name: 'UserActionList',

  components: {
    UserActionItem,
  },

  props: {
    actions: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      filter: 'active',
      options: { wheelPropagation: false },
    };
  },
};
</script>

<style scoped>
.tile-title {
  margin: 0 0 1em 1em;
}

.ps {
  max-height: 355px;
}

.list-enter-active,
.list-leave-active {
  transition: all 100ms ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
