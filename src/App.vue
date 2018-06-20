<template>
  <div id="app">
    <div>
      <img id="top-logo" src="../assets/seasonly_logo_white.svg" >
      <nav>
        <router-link class="link" to="/">HOME</router-link> &nbsp; |
        &nbsp;
        <router-link class="link" to="/about">ABOUT</router-link> &nbsp; |
        &nbsp;<router-link class="link" to="/search">SEARCH</router-link>
        &nbsp; |
        &nbsp;
        <router-link class="link" v-if="isLoggedIn" to="/user">PROFILE</router-link>
        <a href="#" class="link" v-else @click.prevent="toggleLogin">REGISTER/LOGIN</a>
      </nav>
    </div>
    <router-view
      :userShoppingList="userShoppingList"
      :addToMasterList="addToMasterList"
      :addToMasterFavoriteList="addToMasterFavoriteList"
      :deleteFromMasterList="deleteFromMasterList"
      :updateMasterList="updateMasterList"
      :clearMasterList="clearMasterList"
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
  clearItemsFromShoppingList,
  clearShoppingList } from '../services/api.js';

import Auth from './components/Auth.vue';
export default {
  name: 'app',
  data() {
    return {
      isZoomed: false,
      isLoggedIn: false,
      favoritesList: [],
      userShoppingList: [],
      userid: null
    };
  },
  methods: {
    toggleZoom() {
      console.log('everyday I\'m togglin');
      this.isZoomed = !this.isZoomed;
    },
    loggedIn(credentials) {
      localStorage.setItem('userid', credentials.id);
      this.userid = credentials.id;
      console.log('user logged in', this.userid);
      this.isLoggedIn = true;
      this.setMasterList(this.userid);
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
            console.log('we clearddd the seleceted');
            this.userShoppingList = this.userShoppingList.filter(el => !el.selected);
            console.log('new shopping list', this.userShoppingList);
            // Clear out selectedItems from this.userShoppingList
          }
        });
    },
    clearMasterList() {
      clearShoppingList(this.userid)
        .then(result => {
          console.log('resuts are', result);
          if(result.cleared) {
            this.userShoppingList = [];
          }
        });
    },
    updateMasterList(newList) {
      console.log('\n\n list is', newList);
      updateShoppingList(newList)
        .then(result => {
          console.log('\n\nresult is', result);
          if(result.updated) {
            console.log('list has been updated!');
            this.userShoppingList = newList;
          }
        });
    },
    addToMasterFavoriteList(savedRecipe) {
      addToFavoritesList(savedRecipe)
        .then(result => {
          if(result.added) {
            this.favoritesList = savedRecipe;
          }
        });
      console.log('fav list:', this.favoritesList);
    }
  },
  components: {
    Auth
  },
  created() {
    this.userid = localStorage.getItem('userid');
    if(this.userid) {
      this.setMasterList(this.userid);
      this.isLoggedIn = true;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
