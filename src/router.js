import VueRouter from 'vue-router';
import User from './components/User.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Search from './components/Search.vue';
import FavoriteRecipes from './components/FavoriteRecipes.vue';
import ShoppingList from './components/ShoppingList.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/search', component: Search },
    { path: '/favorite-recipes', component: FavoriteRecipes },
    { path: '/shopping-list', component: ShoppingList },
    { path: '*', redirect: '/' }
  ]
});