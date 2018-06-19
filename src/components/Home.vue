<template>
  <div id="home">

    <h1 class="page-header">eatSeasonal</h1>
    <nav>
        <router-link to="/">HOME</router-link>
        &nbsp;
        <router-link to="/about">ABOUT</router-link>
        &nbsp;
        <router-link to="/search">SEARCH</router-link>
        &nbsp;
        <router-link to="/user">USER</router-link>
      </nav>

    <p class="content">Our eatSeasonal app helps you to consume food in a more environmentally conscious way by identifying and purchasing foods that are in season! Search for ingredients that are in season, find recipes using those items and automatically add them to your shopping list. You can also save your favorite recipes!</p>
    
    <router-view></router-view>
     <p>Our eatSeasonal app helps you to consume food in a more environmentally conscious way by identifying and purchasing foods that are in season! Search for ingredients that are in season, find recipes using those items and automatically add them to your shopping list. You can also save your favorite recipes!</p>
 
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
h1 {
 font-family: 'Lobster Two', cursive;
 font-size: 64px;

}

</style>
