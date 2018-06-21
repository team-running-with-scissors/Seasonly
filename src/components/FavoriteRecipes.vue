<template>
  <div id="favorite-recipes">
    <recipe-card
    v-if="recipeZoom"
    :selectedRecipe="selectedRecipe"
    :toggleRecipe="toggleRecipe"
    :userShoppingList="userShoppingList"
    :userid="userid"
    :addToMasterList="addToMasterList"
    />
    <ul>
      <li v-for="item in userFavorites"
      :key="item.RecipeID"
      @click.prevent="handleView(item.recipe_id)">{{ item.recipe_name }}
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
      userFavorites: [],
      selectedRecipe: {},
      recipeZoom: false
    };
  },
  props: {
    userShoppingList: Array,
    userid: Number,
    addToMasterList: Function
  },

  components: {
    RecipeCard
  },

  created() {
    getFavorites(localStorage.getItem('userid'))
      .then(favs => {
        this.userFavorites = favs;
      });
  },
  methods: {
    handleView(recipe) {
      console.log(recipe);
      // Make another API call, then send the returned data to the RecipeCard component/page
      getRecipe(recipe)
        .then(result => {
          console.log('getRecipe result:', result);
          this.recipeZoom = true;
          this.selectedRecipe = result;
        });
    },
    toggleRecipe() {
      this.recipeZoom = !this.recipeZoom;

    }, 
  }
};
</script>

<style>

#favorite-recipes {
  background-color: rgba(0, 0, 0, .6);
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
}

ul {
  list-style: none;
}

</style>