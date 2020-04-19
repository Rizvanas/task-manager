<template>
  <div class="main-content">
    <div>
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  created() {
    this.$emit('ready');
  },
};
</script>
