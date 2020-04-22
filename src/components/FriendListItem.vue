<template>
  <div class="level friend-item">
    <div class="level-left">
      <div class="level-item">
        <span class="profile-pic image is-32x32">
          <img class="is-rounded" :src="friend.avatar" alt="Friend avatar" />
        </span>
      </div>
      <div class="level-item">
        <p class="is-size-6">{{ friend.username }}</p>
      </div>
    </div>
    <transition name="fade">
      <div class="level-right is-size-7">
        <p class="is-small is-pulled-right action-button--submit">
          <span class="icon">
            <i class="fas fa-project-diagram"></i>
          </span>
        </p>
        <p class="is-small is-pulled-right action-button--cancel">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FieldListItem',
  props: {
    friend: {
      type: Object,
      default: () => {
        return {
          username: 'Rizvanas',
          avatar: 'https://bulma.io/images/placeholders/96x96.png',
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.friend-item {
  margin: 4px 20px;
  padding: 0 0.5em 0 0.5em;
  height: 42px;
  border-radius: 6px;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);

  &:hover {
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    background-color: #f6f9fc;

    .action-button {
      background-color: #cde3f8;
    }
  }

  .action-button {
    width: 32px;
    height: 32px;
    padding: 0.5em 0.75em;
    border-radius: 6px;
    margin-left: 0.5em;
    transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);
    position: relative;

    i {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
    }
    &:hover {
      i {
        color: #fff;
      }
    }

    &--submit {
      @extend .action-button;
      &:hover {
        background-color: #3273dc;
      }
    }

    &--cancel {
      @extend .action-button;
      &:hover {
        background-color: #d33e5d;
      }
    }
  }
}
.profile-pic {
  margin-right: 1em;
}
.ps {
  height: 420px;
}
</style>
