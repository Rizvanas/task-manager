<template>
  <div>
    <p class="has-text-weight-bold has-text-centered">Friend invitations</p>
    <ul v-if="invites.length > 0" class="menu-list">
      <li v-for="invite in invites" :key="invite.id">
        <a class="action anchor">
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
                <a
                  @click="$emit('accepted', invite.id)"
                  class="is-small is-pulled-right edit-button is-approve anchor--shadowless"
                >
                  <i class="fas fa-handshake"></i>
                </a>
                <a
                  @click="$emit('declined', invite.id)"
                  class="is-small is-pulled-right edit-button is-delete anchor--shadowless"
                >
                  <i class="fas fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div v-else>
      <br />
      <div class="has-text-centered">
        Currently you have no pending invitations
      </div>
    </div>
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
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);
  border-radius: 6px;
  margin-left: 0.5em;
  width: 32px;
  height: 32px;
  i {
  }
  &:hover {
    i {
      color: white;
    }
  }

  &--submit {
    @extend .invitation-button;
    background-color: #bad8f5;

    &:hover {
      background-color: #3273dc;
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
