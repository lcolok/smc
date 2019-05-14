<template>
  <li class="nav-item">
    <router-link
      :to="link.path"
      @click.native="linkClick"
      class="nav-link"
      :target="link.target"
      :href="link.path"
    >
      <template>
        <i :class="link.icon"></i>
        <span class="nav-link-text">{{ link.name }}</span>
      </template>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "sidebar-item",
  props: {
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: []
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  data() {
    return {
      children: [],
      collapsed: true
    };
  },
  methods: {
    linkClick() {
      console.log("autoClose", this.autoClose);
      console.log("sidebar", this.$sidebar);
      console.log("showSidebar", this.$sidebar.showSidebar);
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
