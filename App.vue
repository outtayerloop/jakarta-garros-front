<template>
  <div id="app">
    <v-app id="inspire">
      <router-view />
    </v-app>
  </div>
</template>

<script>
import * as constants from "./constants";

export default {
  name: constants.NOM_VUE_APP,
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
