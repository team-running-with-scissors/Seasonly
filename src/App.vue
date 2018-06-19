<template>
  <div id="app">
    <div>
      <h1 class="title">seasonly</h1>
      <auth
        id="auth"
        v-show="isZoomed"
        :toggleZoom="toggleZoom"
      />
      <nav>
        <router-link class="link" to="/">HOME</router-link> &nbsp; |
        &nbsp;
        <router-link class="link" to="/about">ABOUT</router-link> &nbsp; |
        &nbsp;
        <router-link v-if="isLoggedIn" to="/user">PROFILE</router-link>

        &nbsp;
        <router-link class="link" to="/search">SEARCH</router-link>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Auth from './components/Auth.vue';
export default {
  name: 'app',
  data() {
    return {
      isZoomed: true,
      isLoggedIn: false
    };
  },
  methods: {
    toggleZoom() {
      console.log('everyday I\'m togglin');
      this.isZoomed = !this.isZoomed;
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
