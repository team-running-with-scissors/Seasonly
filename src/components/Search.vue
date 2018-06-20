<template>
<div>
  <div id="container-whole" class="content">
    <div id="container-search">
      <input
        id="search-box"
        ref="search"
        @keypress.enter="handleSearch"
        v-model="searchTerm"
      >
      <button @click.prevent="handleSearch">Search!</button>
    </div>
    <div>
      <h3>Choose from ingredients in season({{ currentMonth }}):</h3>
      <span id=month-button-container>
        <button :class="[monthChoice === 1 ? active : '' ]" class="filter-button"
         @click="monthChoice = 1"  
         >January</button>
        <button :class="[monthChoice === 2 ? active : '' ]" class="filter-button"
         @click="monthChoice = 2"  
         >February</button>
        <button :class="[monthChoice === 3 ? active : '' ]" class="filter-button"
         @click="monthChoice = 3"  
         >March</button>
        <button :class="[monthChoice === 4 ? active : '' ]" class="filter-button"
         @click="monthChoice = 4"  
         >April</button>
        <button :class="[monthChoice === 5 ? active : '' ]" class="filter-button"
         @click="monthChoice = 5"  
         >May</button>
        <button :class="[monthChoice === 6 ? active : '' ]" class="filter-button"
         @click="monthChoice = 6"  
         >June</button>
        <button :class="[monthChoice === 7 ? active : '' ]" class="filter-button"
         @click="monthChoice = 7"  
         >July</button>
        <button :class="[monthChoice === 8 ? active : '' ]" class="filter-button"
         @click="monthChoice = 8"  
         >August</button>
        <button :class="[monthChoice === 9 ? active : '' ]" class="filter-button"
         @click="monthChoice = 9"  
         >September</button>
        <button :class="[monthChoice === 10 ? active : '' ]" class="filter-button"
         @click="monthChoice = 10"  
         >October</button>
        <button :class="[monthChoice === 11 ? active : '' ]" class="filter-button"
         @click="monthChoice = 11"  
         >November</button>
        <button :class="[monthChoice === 12 ? active : '' ]" class="filter-button"
         @click="monthChoice = 12"  
         >December</button>
      </span>
      <br>
      <span class="food-type-button-container">
        <button :class="[ingredientType === 0 ? active : '' ]" class="filter-button"
         @click="ingredientType = 0"  
         >All</button>
        <button :class="[ingredientType === 1 ? active : '' ]" class="filter-button" 
        @click="ingredientType = 1"
        >Veggies</button>
        <button :class="[ingredientType === 2 ? active : '' ]" class="filter-button" 
        @click="ingredientType = 2"
        >Fruit</button>
        <button :class="[ingredientType === 3 ? active : '' ]" class="filter-button" 
        @click="ingredientType = 3"
        >Meat</button>
        <button :class="[ingredientType === 4 ? active : '' ]" class="filter-button" 
        @click="ingredientType = 4"
        >Seafood</button>
      </span><br/>
      <select 
      v-model="searchTerm"
      @change.prevent="handleSearch"
      >
        <option disabled value="">Please select one</option>
        <option 
        v-for="item in filteredIngredients"
        :key="item.index" 
        :value="item.food"
        >{{ item.food }}
        </option>
      </select>
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
        :addToMasterList="addToMasterList"
        
        v-if="recipeZoom"
        :addToMasterFavoriteList="addToMasterFavoriteList"
      />
    </div>
  </div>
</div>
</template>

<script>

import { searchRecipes, getRecipe, getFoods } from '../../services/api.js';
import RecipeCard from './RecipeCard.vue';

export default {
  props: {
    addToMasterList: {
      type: Function,
      required: true
    },
    addToMasterFavoriteList: {
      type: Function,
      required: true
    }
  },
  components: {
    RecipeCard
  },
  data() {
    return {
      searchTerm: '',
      searchResults: null,
      searched: false,
      seasonalIngredients: [],
      recipeZoom: false,
      selectedRecipe: null,
      ingredientType: 0,
      active: 'active',
      monthChoice: 6
    };
  },
  mounted(){
    this.$refs.search.focus();
  },
  created() {
    const d = new Date;
    const n = d.getMonth();

    getFoods()
      .then(ingredient => {
        this.seasonalIngredients = ingredient
      });
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
    },
  },

  computed: {

    monthFilteredIngredients() {
      return this.seasonalIngredients.filter(ingredient => {
        return (this.monthChoice === 0 || this.monthChoice === ingredient.month_id)
      })
    },

    filteredIngredients() {
      return this.monthFilteredIngredients.filter(ingredient => {
        return (this.ingredientType === 0 || this.ingredientType === ingredient.type_id);
      });
    },

    currentMonth() {
      switch(new Date().getMonth()) {
        case 0:
          return 'January';
        case 1:
          return 'February';
        case 2:
          return 'March';
        case 3:
          return 'April';
        case 4:
          return 'May';
        case 5:
          return 'June';
        case 6:
          return 'July';
        case 7:
          return 'August';
        case 8:
          return 'September';
        case 9:
          return 'October';
        case 10:
          return 'November';
        case 11:
          return 'Dicember';
      }
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
  margin: 20px auto;
  background: rgba(0, 0, 0, .69);
  padding: 20px;
  border-radius: 20px;
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
.button-container {
  border: 2px solid darkgray;
  border-radius: 3px;
}
.filter-button {
  background-color: lightgray;
  opacity: .75;
  border: none;
  margin-bottom: 15px;
  padding: 5px;
  width: 60px;
}
.filter-button:hover {
  opacity: 1;
  cursor: pointer;
}

.active {
  background-color: rgb(0, 103, 221);
  color: white;
}

#search-box{
  margin-top: 25px;
}

</style>
