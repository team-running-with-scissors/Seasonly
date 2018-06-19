<template>
<div>
  <div id="container-whole">
    <div id="container-search">
      <input v-model="searchTerm">
      <button @click.prevent="handleSearch">Search!</button>
    </div>
    <div>
      <h3>Choose from ingredients in season({{ currentMonth }}):</h3>
      <select v-model="searchTerm">
        <option disabled value="">Please select one</option>
        <option v-for="item in seasonalIng"
        :key="item.index" value="Select">{{ item.food }}</option>
      </select>
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
      {{ searchResults }}
    </div>
  </div>
</div>
</template>

<script>
import { getRecipes } from '../../services/api.js';
import { getFoods } from '../../services/api.js';
export default {
  data() {
    return {
      searchTerm: '',
      searchResults: null,
      searched: false,
      seasonalIng: null
    };
  },

  created() {
    const d = new Date;
    const n = d.getMonth();
    getFoods()
      .then(ingredient => {
        this.seasonalIng = ingredient.filter(x => {
          return x.month_id - 1 === n;
        });
      });
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
  },

  computed: {
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
  margin: auto;
}
ul {
  list-style: none;
}
li {
  border: 1px solid black;
  border-radius: 6px;
  padding: 6px;
}
img {
  width: 200px;
  float: right;
}
</style>
