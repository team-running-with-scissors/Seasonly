<template>
<div>
<div id="container-main" class="full-screen">
  <div id="container-recipe">
    <div id="container-top">
      <div id="exit" @click.prevent="handleZoom">
        <b>X</b>
      </div>
      <div id="star">
        <span id="spans" class="fa fa-star-o"></span>
        <div class="ring"></div>
        <div class="ring2"></div>
        <p id="info"></p>
      </div>
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
    userid: Number,
    userShoppingList: Array,
    isFavorite: Boolean
  },
  data() {
    return {
      addedToList: false
    };
  },
  created() {
    setTimeout(() => {
      
      starStuff(this.isFavorite);
    }, 200);
  },
  methods: {
    handleZoom() {
      this.toggleRecipe();
    },
    handleAdd() {
      console.log('this userid is', this.userid, typeof(this.userid));
      if(typeof(this.userid) !== 'number' || isNaN(this.userid)) {
        this.toggleRecipe(true);
      }
      else {
        let filteredIngredients = this.selectedRecipe.Ingredients.filter(el => this.userShoppingList.every(a => el.Name !== a.item));
        let ingredients = {};
        ingredients = filteredIngredients.reduce((acc, cur, i) => {
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
        this.addToMasterFavoriteList(favorites);
      }
    }
  }
};

let toggle;
let info;
let star;
let spans;

let starStuff = function(isFavorite) {
  star = document.getElementById('star');
  toggle = !isFavorite;
  toggleStar();
  star.addEventListener('click', function() {
    toggleStar(toggle);
  });
}

let toggleStar = function() {
  star = document.getElementById('star');
  info = document.getElementById('info');
  spans = document.getElementById('spans');
  if (toggle) {
    toggle = !toggle;
    star.classList.remove('active')
    setTimeout(function() {
      star.classList.remove('active-2')
    }, 30)
    star.classList.remove('active-3')
    setTimeout(function() {
      spans.classList.remove('fa-star')
      spans.classList.add('fa-star-o')
    }, 15)
  } else {
    toggle = !toggle;
    star.classList.add('active')
    star.classList.add('active-2')
    setTimeout(function() {
      spans.classList.add('fa-star')
      spans.classList.remove('fa-star-o')
    }, 150)
    setTimeout(function() {
      star.classList.add('active-3')
    }, 150)
    info.classList.add('info-tog')
    setTimeout(function(){
      info.classList.remove('info-tog')
    },1000)
  }
  console.log('erry day ahm taahguhlynn', toggle);
}



</script>
<style scoped>
/* @import url(//fonts.googleapis.com/css?family=Open+Sans:600,400&subset=latin,cyrillic); */

h4 {
	text-align: center;
	font-family: 'Open Sans', sans-serif;
	font-weight: 400;
	opacity: 0.7;
}

#star {
	font-size: 33px;
	color: rgba(0,0,0,.5);
	width: 38px;
	height: 38px;
	margin: 0;
	position: relative;
	cursor: pointer;
}

#star span {
	z-index: 999;
	position: relative;
}

span:hover {
	opacity: 0.8;
}

span:active {
	transform: scale(0.93,0.93) translateY(2px)
}

.ring, .ring2 {
	opacity: 0;
	background: grey;
	width: 1px;
	height: 1px;
	position: absolute;
	top: 19px;
	left: 18px;
	border-radius: 50%;
	cursor: pointer;
}

.active span, .active-2 span {
	color: #F5CC27 !important;
}

.active-2 .ring {
	width: 58px !important;
	height: 58px !important;
	top: -10px !important;
	left: -10px !important;
	position: absolute;
	border-radius: 50%;
	opacity: 1 !important;
}

.active-2 .ring {
	background: #F5CC27 !important;
}

.active-2 .ring2 {
	background: steelblue !important;
}

.active-3 .ring2 {
	width: 60px !important;
	height: 60px !important;
	top: -11px !important;
	left: -11px !important;
	position: absolute;
	border-radius: 50%;
	opacity: 1 !important;
}

#info {
  position: fixed;
	font-family: 'Open Sans', sans-serif;
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	white-space: nowrap;
	color: grey;
	position: relative;
	left: -46px;
	opacity: 0;
	transition: all 0.3s ease;
}

.info-tog {
	color: steelblue;
	position: relative;
	top: 45px;
	opacity: 1;
}

* {
	transition: all .32s ease;
}
















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
#container-top {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
#exit {
  cursor: pointer;
  border-top: 1px solid gray;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid gray;
  padding: 0 3px;
  background-color: slategrey;
  height: fit-content;
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
