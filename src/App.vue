<template>
  <div id="app">
    <div>
      <h1 class="title">seasonly</h1>
      <nav>
        <router-link class="link" to="/">HOME</router-link> &nbsp; |
        &nbsp;
        <router-link class="link" to="/about">ABOUT</router-link> &nbsp; |
        &nbsp;
        <router-link class="link" v-if="isLoggedIn" to="/user">PROFILE</router-link>
        <a href="#" class="link" v-else @click.prevent="toggleLogin">REGISTER/LOGIN</a> &nbsp; |
        &nbsp;
        <router-link class="link" to="/search">SEARCH</router-link>
      </nav>
    </div>
    <router-view
      :getFromMasterList="getFromMasterList"
      :addToMasterList="addToMasterList"
    ></router-view>
    
<transition name="fade-out">
  <auth
    id="auth"
    v-show="isZoomed"
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
  addToShoppingList } from '../services/api.js';
import Auth from './components/Auth.vue';
export default {
  name: 'app',
  data() {
    return {
      isZoomed: false,
      isLoggedIn: false,
      shoppingList: []
    };
  },
  methods: {
    toggleZoom() {
      console.log('everyday I\'m togglin');
      this.isZoomed = !this.isZoomed;
    },
    loggedIn(credentials) {
      localStorage.setItem('userid', credentials.id);
      this.isLoggedIn = true;
    },
    toggleLogin() {
      this.isZoomed = true;
    },
    addToMasterList(ingredients) {
      addToShoppingList(ingredients)
        .then(result => {
          if(result.added) {
            this.shoppingList = ingredients;
          }
        });
    },
    getFromMasterList() {
      getShoppingList(localStorage.getItem('userid'))
        .then(result => {
          this.shoppingList.push(result);
        });
      console.log('the list is', this.shoppingList);
      return this.shoppingList;
    },
    updateMasterList(newList) {
      console.log('\n\n list is', newList);
      updateShoppingList(newList)
        .then(result => {
          console.log('\n\nresult is', result);
        });
    }
  },
  components: {
    Auth
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

#auth {
}

.title{
Font-Family: 'Roboto', Sans-Serif;
Font-Size: 4.0em;

} 

/* .content{
Font-Family: 'Lora', Serif;
Font-Size: 1.75em;
} */
/* 
.title{
Font-Family: 'Roboto Condensed', Sans-Serif;
Font-Size: 4.0em;
} */
.content{
Font-Family: 'Cabin', Sans-Serif;
Font-Size: 1.75em;
}

.link{
  Font-Family: 'Roboto Condensed', Sans-Serif;
  text-decoration: none;
  color: gray;
}

.link:hover{
  color:#2c3e50;
}
</style>
