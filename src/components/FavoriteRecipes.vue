<template>
  <div id="favorite-recipes">
    
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