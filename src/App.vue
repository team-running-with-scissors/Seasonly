<template>
  <div id="app">
    <div>
      <img id="top-logo" src="../assets/seasonly_logo_new.svg" >
      <nav>
        <router-link class="link" to="/">HOME</router-link> &nbsp; |
        &nbsp;
        <router-link class="link" to="/about">ABOUT</router-link> &nbsp; |
        &nbsp;<router-link class="link" to="/search">SEARCH</router-link>
        &nbsp; |
        &nbsp;
        <div style="display: inline" v-if="isLoggedIn">
          <router-link class="link" to="/shopping-list">LIST</router-link>
          &nbsp; |
          &nbsp;
          <router-link class="link" to="/favorite-recipes">FAVORITES</router-link>
        </div>
        <a href="#" class="link" v-else @click.prevent="toggleLogin">REGISTER/LOGIN</a>
        <div style="display: inline" v-if="isLoggedIn">
          &nbsp; |
          &nbsp;
          <a href="#" class="link"  @click.prevent="logout">LOGOUT</a>
        </div>
      </nav>
    </div>
    <router-view
      :userShoppingList="userShoppingList"
      :addToMasterList="addToMasterList"
      :addToMasterFavoriteList="addToMasterFavoriteList"
      :removeFromMasterFavoriteList="removeFromMasterFavoriteList"
      :deleteFromMasterList="deleteFromMasterList"
      :updateMasterList="updateMasterList"
      :clearMasterList="clearMasterList"
      :userid="userid"
      :toggleZoom="toggleZoom"
      :toggleRain="toggleRain"
      :favoritesList="favoritesList"
    ></router-view>
<transition name="fade">
  <auth
    id="auth"
    v-if="isZoomed"
    :toggleZoom="toggleZoom"
    :loggedIn="loggedIn"
  />
</transition>
</div>
</template>

<script>
import {
  updateShoppingList,
  getShoppingList,
  addToShoppingList,
  addToFavoritesList,
  getFavorites,
  removeFromFavorites,
  clearItemsFromShoppingList,
  clearShoppingList } from '../services/api.js';

import { makeItStop } from './food-rain/rain.js';

import Auth from './components/Auth.vue';

export default {
  name: 'app',
  data() {
    return {
      isZoomed: false,
      isLoggedIn: false,
      favoritesList: [],
      userShoppingList: [],
      userid: null,
      raining: false
    };
  },
  methods: {
    toggleRain() {
      this.raining = true;
    },
    toggleZoom() {
      console.log('everyday I\'m togglin');
      this.isZoomed = !this.isZoomed;
    },
    logout() {
      this.isLoggedIn = false;
      this.favoritesList = [];
      this.userShoppingList = [];
      this.userid = null;
      localStorage.clear();
      this.$router.push('/');
    },
    loggedIn(credentials) {
      localStorage.setItem('userid', credentials.id);
      this.userid = credentials.id;
      console.log('user logged in', this.userid);
      this.isLoggedIn = true;
      this.setMasterList(this.userid);
      getFavorites(localStorage.getItem('userid'))
      .then(favs => {
        this.favoritesList = favs;
      });
    },
    toggleLogin() {
      this.isZoomed = true;
    },
    addToMasterList(ingredients) {
      addToShoppingList(ingredients)
        .then(result => {
          if(result.added) {
            this.userShoppingList = this.userShoppingList.concat(Object.assign(ingredients));
          }
        });
    },
    setMasterList(userid) {
      return getShoppingList(userid)
        .then(result => {
          this.userShoppingList = Object.assign(result);
        });
    },
    deleteFromMasterList(selectedItems) {
      let itemsPackage = {};
      itemsPackage.userid = this.userid;
      itemsPackage.items = selectedItems;
      clearItemsFromShoppingList(itemsPackage)
        .then(result => {
          if(result.updated) {
            this.userShoppingList = this.userShoppingList.filter(el => !el.selected);
          }
        });
    },
    clearMasterList() {
      clearShoppingList(this.userid)
        .then(result => {
          if(result.cleared) {
            this.userShoppingList = [];
          }
        });
    },
    updateMasterList(newList) {
      console.log('\n\n list is', newList);
      updateShoppingList(newList)
        .then(result => {
          if(result.updated) {
            this.userShoppingList = newList;
          }
        });
    },
    addToMasterFavoriteList(savedRecipe) {
      console.log('the sved recipe is', savedRecipe);
      addToFavoritesList(savedRecipe)
        .then(result => {
          if(result.added) {
            this.favoritesList.push(savedRecipe[0]);
          }
        });
    },
    removeFromMasterFavoriteList(favoriteInfo) {
      let packageInfo = { userid : this.userid, recipeid : favoriteInfo };
      console.log('fav info', packageInfo);
      removeFromFavorites(packageInfo)
        .then(result => {
          if(result.removed) {
            this.favoritesList.pop();
          };
        });
    }
  },
  components: {
    Auth
  },
  watch: {
    '$route': function() {
      if(this.raining) {
        makeItStop();
      }
    }
  },
  created() {
    this.userid = parseInt(localStorage.getItem('userid'));
    if(this.userid) {
      this.setMasterList(this.userid);
      this.isLoggedIn = true;
      getFavorites(localStorage.getItem('userid'))
      .then(favs => {
        this.favoritesList = favs;
      });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

#top-logo{
  width: 20%;
  max-width: 50%;
  margin-bottom: 15px
}

.title{
Font-Family: 'Roboto', Sans-Serif;
Font-Size: 4.0em;
} 

.content{
Font-Family: 'Cabin', Sans-Serif;
Font-Size: 1.75em;
}

.link{
  Font-Family: 'Roboto Condensed', Sans-Serif;
  text-decoration: none;
  Font-Size: 1.4em;
  color:#fff;
}

.link:hover{
  color:rgb(255,201,60);
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
