<template>
<div>
  <div id="container-whole">
    <div id="container-search">
      <input @keypress.enter="handleSearch" v-model="searchTerm">
      <button @click.prevent="handleSearch">Search!</button>
    </div>
    <div id="container-main">
      <ul v-if="searched">
        <li
          v-for="result in searchResults"
          :key="result.RecipeID"
          @click.prevent="handleView(result.RecipeID)"
        >
          <div id="image">
            <img :src="result.PhotoUrl">
          </div>
          <h1>{{ result.Title }}</h1>
          <p>{{ result.Description }}</p>
        </li>
      </ul>

      <recipe-card
        :selectedRecipe="selectedRecipe"
        :toggleRecipe="toggleRecipe"
        v-if="recipeZoom"
      />
      
    </div>
  </div>
</div>
</template>

<script>
import { searchRecipes, getRecipe } from '../../services/api.js';
import RecipeCard from './RecipeCard.vue';
export default {
  components: {
    RecipeCard
  },
  data() {
    return {
      searchTerm: null,
      searchResults: null,
      searched: false,
      recipeZoom: false,
      selectedRecipe: null
    };
  },
  methods: {
    handleSearch() {
      console.log('in the search diddle');
      searchRecipes(this.searchTerm)
        .then(result => {
          console.log('the resuts', result.Results);
          this.searchResults = result.Results;
          this.searched = true;
        });
    },
    handleView(recipe) {
      console.log(recipe);
      // Make another API call, then send the returned data to the RecipeCard component/page
      getRecipe(recipe)
        .then(result => {
          this.recipeZoom = true;
          this.selectedRecipe = result;
        });
    },
    toggleRecipe() {
      this.recipeZoom = !this.recipeZoom;
    }
  }
};
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
  /* display: inline; */
  float: right;
}
li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  border: 1px solid black;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  align-items: center;
  height: fit-content;
}
img {
  vertical-align: middle;
  max-height: 100%;
}
#image {
  overflow: hidden;
  height: 100px;
  width: 100px;
}
</style>
