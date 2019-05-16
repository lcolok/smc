<template>
  <v-app>
    <v-flex v-if="loginStatus">
      <core-filter/>

      <core-toolbar/>

      <core-drawer/>
    </v-flex>

    <core-view/>
  </v-app>
</template>

<script>
import AV from "@/plugins/leancloud";
export default {
  computed: {
    loginStatus: () => {
      console.log(AV.User.current());
      return AV.User.current();
    }
  }
};
</script>


<style lang="scss">
@import "@/styles/index.scss";

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
