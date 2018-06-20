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
      :userShoppingList="userShoppingList"
      :addToMasterList="addToMasterList"
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
  clearShoppingList } from '../services/api.js';
import Auth from './components/Auth.vue';
export default {
  name: 'app',
  data() {
    return {
      isZoomed: false,
      isLoggedIn: false,
      userShoppingList: null,
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
            // Need to push or concat the ingredients here
            this.userShoppingList += ingredients;
          }
        });
    },
    setMasterList(userid) {
      return getShoppingList(userid)
        .then(result => {
          this.userShoppingList = Object.assign(result);
        });
    },
    clearMasterList() {
      console.log('in the thingsyting');
      clearShoppingList(this.userid)
        .then(result => {
          console.log('resuts are', result);
          if(result.cleared) {
            this.userShoppingList = null;
          }
        });
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


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
