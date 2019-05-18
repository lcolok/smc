const images = [
  'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-1.23832d31.jpg',
  'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
  'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-3.3a54f533.jpg',
  'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg',
  'https://cdn.dribbble.com/users/2453998/screenshots/5895939/fruit_ninja.gif',
  'https://cdn.dribbble.com/users/31664/screenshots/5826010/speed_kills_2.gif',
  'https://cdn.dribbble.com/users/31664/screenshots/6324479/dribbble_1.gif',
  'https://cdn.dribbble.com/users/634508/screenshots/6176810/longwindingroad_dribbble.gif',
  'https://cdn.dribbble.com/users/1903950/screenshots/6120821/shot_3__1.gif',
  'https://cdn.dribbble.com/users/1903950/screenshots/6071583/comp_4.gif',
  'https://cdn.dribbble.com/users/1903950/screenshots/6046188/dribble__1_.gif',
  'https://images-cdn.shimo.im/tncnW1p0rUsZA8PR/cat_washer_dribbble.gif'
];

const colors = ["primary", "info", "success", "warning", "danger",]

export default {
  devPort: null,
  drawer: null,
  color: 'primary',
  colors: colors,
  image: images[Math.floor(images.length * Math.random())],//随机显示某一张
  images: images,
  sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)'
}
