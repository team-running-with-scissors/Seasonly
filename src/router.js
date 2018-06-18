import VueRouter from 'vue-router';
import Auth from './components/Auth.vue';
import Home from './components/About.vue';
import About from './components/Home.vue';
import FavoriteRecipes from './components/FavoriteRecipes.vue';
import ShoppingList from './components/ShoppingList.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/user', component: Auth },
    { 
      path: '/user/:id', 
      component: Auth,
      children: [
        { path: 'favorite-recipes', component: FavoriteRecipes },
        { path: 'shopping-list' },
        { component: ShoppingList }
      ]
    },
    { path: '*', redirect: '/' }
  ]
});