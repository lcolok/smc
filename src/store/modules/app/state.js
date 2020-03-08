const images1 = [
	'https://cdn.dribbble.com/users/59947/screenshots/6145574/run-for-dribbble.gif',
	'https://cdn.dribbble.com/users/500242/screenshots/6357566/scrollboi_finalfinalpdf_render2_dribbble2.gif',
	'https://cdn.dribbble.com/users/634508/screenshots/5755935/kittyyingyang_dribbble.gif',
	'https://cdn.dribbble.com/users/330915/screenshots/6554409/1_new_condo.gif',
	'https://cdn.dribbble.com/users/2453998/screenshots/5895939/fruit_ninja.gif',
	'https://cdn.dribbble.com/users/31664/screenshots/5826010/speed_kills_2.gif',
	'https://cdn.dribbble.com/users/31664/screenshots/6324479/dribbble_1.gif',
	'https://cdn.dribbble.com/users/634508/screenshots/6176810/longwindingroad_dribbble.gif',
	'https://cdn.dribbble.com/users/1903950/screenshots/6120821/shot_3__1.gif',
	'https://cdn.dribbble.com/users/1903950/screenshots/6071583/comp_4.gif',
	'https://cdn.dribbble.com/users/1903950/screenshots/6046188/dribble__1_.gif',
	'https://images-cdn.shimo.im/tncnW1p0rUsZA8PR/cat_washer_dribbble.gif',
];

const images = [
	'https://cdn.dribbble.com/users/15687/screenshots/6791533/lotr-bilbo.png',
	'https://cdn.dribbble.com/users/15687/screenshots/6760627/st-byers2.png',
	'https://cdn.dribbble.com/users/15687/screenshots/6640481/barbecue2.png',
	'https://cdn.dribbble.com/users/15687/screenshots/6618356/rainforest2.png',
];

const colors = ['#2196F3', '#11cdef', '#2dce89', '#fb6340'];

const random = images[Math.floor(images.length * Math.random())];

export default {
	devPort: null,
	drawer: null,
	color: '#2196F3',
	colors: colors,
	image: random, //随机显示某一张
	images: images,
	sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)',

	typeList: [
		{
			size: '20',
			icon: 'fas fa-globe-americas',
			text: '全部',
			count: 0,
		},
	],
};
