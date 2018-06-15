import VueRouter from 'vue-router';


export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component:  },
    { path: '/whatever', component:  },
    { 
      path: '/quadrants/:id', 
      component: QuadrantDetail,
      children: [
        { path: 'list', component: NeighborhoodsList },
        { path: 'map', component: NeighborhoodsMap },
        { path: 'new', component: NewNeighborhood },
        { path: '', redirect: 'list' }
      ]
    },
    { path: '*', redirect: '/' }
  ]
});