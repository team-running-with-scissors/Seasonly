<template>
<div>
  <div id="container-whole">
    <div id="container-search">
      <input v-model="searchTerm">
      <button @click.prevent="handleSearch">Search!</button>
    </div>
    <div id="container-main">

    </div>
  </div>
</div>
</template>

<script>
import { getRecipes } from '../../services/api.js';
export default {
  data() {
    return {
      searchTerm: null
    };
  },
  methods: {
    handleSearch() {
      console.log('in the search diddle');
      getRecipes(this.searchTerm)
        .then(result => {
          console.log('the resuts', result);
          // JUST DO STUFF
        });
    }
  }
}
</script>

<style scoped>
#container-search {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
