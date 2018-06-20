<template>
  <div id="home">
    <p class="content">Our Seasonly app helps you to consume food in a more environmentally conscious way by identifying and purchasing foods that are in season! Search for ingredients that are in season this month, find recipes using those items and automatically add them to your shopping list. You can also save your favorite recipes!</p>
    <a class="ghost-button" href="/#/search">Get Started</a>

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
p {
  color: #fff;
}
.ghost-button {
  display: inline-block;
  width: 200px;
  padding: 8px;
  color: #fff;
  border: 1px solid #fff;
  text-align: center;
  outline: none;
  text-decoration: none;
}
.ghost-button:hover,
.ghost-button:active {
  background-color: #fff;
  color: #000;
}

</style>
