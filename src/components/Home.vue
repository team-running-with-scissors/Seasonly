<template>
  <div id="home">
    <p class="content">Our Seasonly app helps you to consume food in a more environmentally conscious way by identifying and purchasing foods that are in season! Search for ingredients that are in season this month, find recipes using those items and automatically add them to your shopping list. You can also save your favorite recipes!</p>
weds
    <blockquote>Supporting local food production is so much healthier for people. It's better for the local economy, and it's a lot of fun.<br />
    - Jack Johnson</blockquote>


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
blockquote {
color: #fff;
font-size: 24px;
font-style: italic;
margin-left: 10%;
margin-right: 10%;
border-top: 1px solid white;

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
