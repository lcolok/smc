

<template v-cloak>
  <div id="app" style="height: 100%;">
    <!--     <transition enter-to-class="animated bounceInLeft">
      <router-view></router-view>
    </transition>-->
    <core-drawer/>
    <notifications/>
    <router-view/>
  </div>
</template>
