<template>
<div>
  <div id="container-whole">
    <div id="container-search">
      <input v-model="searchTerm">
      <button @click.prevent="handleSearch">Search!</button>
    </div>
    <div id="container-main">
      <ul v-if="searched">
        <li
          v-for="result in searchResults"
          :key="result.RecipeID"
        >
          <h1>{{ result.Title }}</h1>
          <img :src="result.PhotoUrl">
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { getRecipes } from '../../services/api.js';
export default {
  data() {
    return {
      searchTerm: null,
      searchResults: null,
      searched: false
    };
  },
  methods: {
    handleSearch() {
      console.log('in the search diddle');
      getRecipes(this.searchTerm)
        .then(result => {
          console.log('the resuts', result.Results);
          this.searchResults = result.Results;
          this.searched = true;
        });
    }
  }
}
</script>

<style scoped>
#container-whole {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 777px;
  margin: auto;
}
ul {
  list-style: none;
}
h1 {
  display: inline;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 6px;
  padding: 6px;
}
img {
  display: block;
  height: auto;
  width: 100px;
  float: right;
}
</style>
