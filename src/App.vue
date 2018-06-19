<template>
  <div id="app">
    <div>
      <h1>Let's do it</h1>
      <nav>
        <router-link to="/">HOME</router-link>
        &nbsp;
        <router-link to="/about">ABOUT</router-link>
        &nbsp;
        <router-link v-if="isLoggedIn" to="/user">PROFILE</router-link>
        <a href="#" v-else @click.prevent="toggleLogin">REGISTER/LOGIN</a>
        &nbsp;
        <router-link to="/search">SEARCH</router-link>
      </nav>
    </div>
    <router-view></router-view>
    
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

import Auth from './components/Auth.vue';
export default {
  name: 'app',
  data() {
    return {
      isZoomed: false,
      isLoggedIn: false
    };
  },
  methods: {
    toggleZoom() {
      console.log('everyday I\'m togglin');
      this.isZoomed = !this.isZoomed;
    },
    loggedIn(credentials) {
      console.log('frogs on a log in the foggy bog bog', credentials);
      this.isLoggedIn = true;
    },
    toggleLogin() {
      this.isZoomed = true;

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


/* .fade-out- */
</style>
