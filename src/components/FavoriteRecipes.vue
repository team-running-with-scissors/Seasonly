<template>
  <div id="favorite-recipes">
    <ul>
      <li v-for="item in userFavorites"
      :key="item.RecipeID">{{ item.recipe_name }}</li>
    </ul>
  </div>
</template>

<script>
import { getFavorites } from '../../services/api.js';
export default {
  data() {
    return {
      userFavorites: []
    };
  },

  created() {
    getFavorites(localStorage.getItem('userid'))
      .then(favs => {
        this.userFavorites = favs;
      });
  }
};
</script>

<style>

</style>