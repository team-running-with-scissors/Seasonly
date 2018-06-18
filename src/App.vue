<template>
  <div id="app">
    <div>
      <auth
        id="auth"
        v-show="isZoomed"
        :toggleZoom="toggleZoom"
      />
    </div>
  </div>
</template>

<script>

import Auth from './components/Auth.vue';
export default {
  name: 'app',
  data() {
    return {
      isZoomed: true
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
</style>
