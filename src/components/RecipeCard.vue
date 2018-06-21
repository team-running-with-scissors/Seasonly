<template>
<div>
<div id="container-main" class="full-screen">
  <div id="container-recipe">
    <div id="exit" @click.prevent="handleZoom">
      <b>X</b>
    </div>
    <h1>{{ selectedRecipe.Title }}</h1>
    <button @click="handleSaveFav">Add to favorites</button>
    <div id="container-details">
      <div
        id="ingredients"
        v-if="!addedToList"
      >
        <ul>
          <li
            v-for="(ingredient, index) in selectedRecipe.Ingredients"
            :key="index"
          >
            {{ ingredient.Name }}
          </li>
        </ul>
      <button @click.prevent="handleAdd">Add to shopping list</button>
      </div>
      <div
        id="items-added"
        v-else
      >
        <h3>Items added to shopping list!</h3>
      </div>
      <div id="instructions">
        <p>{{ selectedRecipe.Instructions }}</p>
      </div>
    </div>
  </div>
  <span id='click-me' class="full-screen" @click.prevent="handleZoom"></span>
</div>
</div>
</template>

<script>
// import './main.css';
export default {
  props: {
    toggleRecipe: {
      type: Function,
      require: true
    },
    selectedRecipe: Object,
    addToMasterList: {
      type: Function
    },
    addToMasterFavoriteList: {
      type: Function
    },
    userid: Number
  },
  data() {
    return {
      addedToList: false
    };
  },
  methods: {
    handleZoom() {
      this.toggleRecipe();
    },
    handleAdd() {
      console.log('this userid is', this.userid);
      if(this.userid === null) {
        this.toggleRecipe(true);
      }
      else {
        console.log('ingreeeeeeeeedz', this.selectedRecipe.Ingredients);
        let tempIng = this.selectedRecipe.Ingredients.filter(el => this.userShoppingList.every(a => el.Name != a.item))
        let ingredients = {};
        ingredients = this.selectedRecipe.Ingredients.reduce((acc, cur, i) => {
          acc[i] = { item : cur.Name, selected : false, user_id : parseInt(this.userid) }; // Replace with localstorage userid
          return acc;
        }, []);
        this.addToMasterList(ingredients);
        this.addedToList = true;
      }
    },
    handleSaveFav() {
      if(this.userid === null) {
        this.toggleRecipe(true);
      }
      else {
        let favorites = {};
        favorites = [{ recipe_name : this.selectedRecipe.Title, user_id : parseInt(this.userid), recipe_id : this.selectedRecipe.RecipeID, selected : false }];
        console.log('look here bobby', favorites);
        // console.log('fav recipes:', this.savedRecipes);
        this.addToMasterFavoriteList(favorites);
      }
    }
  }
};
</script>
<style scoped>
#container-recipe {
  color: white;
  background: steelblue;
  border: 1px solid black;
  border-radius: 13px;
  padding: 13px;
  width: fit-content;
  z-index: 1;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 3px black;
}
.full-screen {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
#click-me {
  background-color: rgba(0, 0, 0, .69);
  z-index: 0;
}
#container-details {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
#exit {
  float: right;
  position: absolute;
  cursor: pointer;
  border-top: 1px solid gray;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid gray;
  padding: 0 3px;
  background-color: slategrey;
}
#ingredients {
  float: left;
}
#items-added {
  padding: 33px;
  word-wrap: normal;
  max-width: 200px;
}
#instructions {
  max-width: 400px;
  float: right;
  padding: 13px;
  background-color: rgba(0, 0, 0, .69);
  max-height: 400px;
  overflow-y: scroll;
}
ul {
  /* list-style: none; */
  font-size: .75rem;
  text-align: left;
  padding-right: 33px;
}
</style>
