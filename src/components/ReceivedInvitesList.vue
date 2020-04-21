<template>
  <div>
    <p class="has-text-size-large has-text-weight-bold has-text-centered">
      Friend invitations
    </p>
    <ul v-if="invites.length > 0" class="menu menu-list">
      <li v-for="invite in invites" :key="invite['.key']">
        <a class="action">
          <div class="level">
            <div class="level-left">
              <span class="level-item profile-pic image is-32x32">
                <img
                  class="is-rounded"
                  :src="invite.fromAvatar"
                  alt="Invitor avatar"
                />
              </span>
              <div class="level-item">
                <p>{{ invite.fromUsername }}</p>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <p
                  @click="$emit('accepted', invite['.key'])"
                  class="is-small is-pulled-right invitation-button--submit"
                >
                  <i class="fas fa-handshake"></i>
                </p>
                <p
                  @click="$emit('declined', invite['.key'])"
                  class="is-small is-pulled-right invitation-button--cancel"
                >
                  <i class="fas fa-times"></i>
                </p>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <br />
    <div class="has-text-centered">You have no pending invitations</div>
  </div>
</template>

<script>
export default {
  name: 'ReceivedInvitesList',
  props: {
    invites: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.invitesDropdown {
  margin: 0 20px;
  border-radius: 30%;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);
}
.profile-pic {
  margin-right: 0.5em;
}

.action-text {
  overflow: hidden;
  padding: 0 1rem 0 1rem;
}

.invitation-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 0.5em;
  text-align: center;
  i {
    padding-top: 0.5em;
  }
  &:hover {
    i {
      color: white;
    }
  }

  &--submit {
    @extend .invitation-button;
    background-color: #cdf8ce;

    &:hover {
      background-color: hsl(141, 53%, 53%);
    }
  }

  &--cancel {
    @extend .invitation-button;
    background-color: #f8cdcd;
    &:hover {
      background-color: #d33e5d;
    }
  }
}
</style>
