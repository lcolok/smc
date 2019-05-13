<template>
</template>
<script>
export default {
  created() {
    let __this = this;
    this.$AV.User.logOut().then(e => {
      __this.$router.push({
        path: "/login"
      });
    });
  }
};
</script>