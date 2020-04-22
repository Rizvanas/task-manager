<template>
  <div>
    <p class="has-text-weight-bold has-text-centered is-size-6 dropdown-title">
      Invite someone
    </p>
    <div class="field is-fullwidth">
      <p class="control has-icons-right">
        <input class="input" type="text" placeholder="Enter a username" />
      </p>
    </div>
    <!-- <perfect-scrollbar></perfect-scrollbar> -->
    <div class="is-horizontal-center is-vcentered">
      <figure class="image is-64x64 is-centered">
        <img src="@/assets/img/search.png" alt="Search image" />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSearchDropdown',
};
</script>

<style lang="scss" scoped>
.dropdown-title {
  margin: 0 0 1em 0;
}

.ps {
  height: 320px;
}

.is-horizontal-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
