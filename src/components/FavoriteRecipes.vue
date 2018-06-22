<template>
  <div id="favorite-recipes" class="container-main">
    <recipe-card
    v-if="recipeZoom"
    :selectedRecipe="selectedRecipe"
    :toggleRecipe="toggleRecipe"
    :userShoppingList="userShoppingList"
    :userid="userid"
    :addToMasterList="addToMasterList"
    :addToMasterFavoriteList="addToMasterFavoriteList"
    :removeFromMasterFavoriteList="removeFromMasterFavoriteList"
    :isFavorite="isFavorite"
    />
    <ul>
      <li
        v-for="item in favoritesList"
        :key="item.RecipeID"
        @click.prevent="handleView(item.recipe_id)"
      >
        {{ item.recipe_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getFavorites, getRecipe } from '../../services/api.js';
import RecipeCard from './RecipeCard.vue';
export default {
  data() {
    return {
      selectedRecipe: {},
      recipeZoom: false,
      isFavorite: true
    };
  },
  props: {
    userShoppingList: Array,
    userid: Number,
    addToMasterList: Function,
    addToMasterFavoriteList: Function,
    removeFromMasterFavoriteList: Function,
    favoritesList: Array
  },

  components: {
    RecipeCard
  },

  methods: {
    handleView(recipe) {
      // Make another API call, then send the returned data to the RecipeCard component/page
      getRecipe(recipe)
        .then(result => {
          this.recipeZoom = true;
          this.selectedRecipe = result;
          console.log('selected recipe');
          this.selectedRecipe.map();
        });
    },
    toggleRecipe() {
      this.recipeZoom = !this.recipeZoom;

    }, 
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0 50px;
}
li {
  margin: auto;
  max-width: 200px;
  border-bottom: 1px solid #fff;
  padding: 10px; 
}
li:hover {
  font-weight: bold;
  background-color: rgba(255, 255, 255, .69);
  color: rgb(21, 82, 99);
  cursor: pointer;
}
.ghost-button {
  width: fit-content;
  padding: 3px 13px;
  font-size: 1rem;
}
</style>