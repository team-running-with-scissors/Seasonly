<template>
  <div id="home">
    <p class="content">Our Seasonly app helps you to consume food in a more environmentally conscious way by identifying and purchasing foods that are in season! Search for ingredients that are in season this month, find recipes using those items and automatically add them to your shopping list. You can also save your favorite recipes!</p>
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

#home {
background-color: rgba(0, 0, 0, .5);
margin-top: 20px;
margin-left: 10%;
margin-right: 10%;
border-radius: 20px;
padding-top: 20px;
padding-left: 20px;
padding-right: 20px;
padding-bottom: 40px;
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
  font-size: 20px;
  width: 200px;
  padding: 8px;
  color: #fff;
  background-color: rgba(255, 255, 255, .2);
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
