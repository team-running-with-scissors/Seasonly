<template>
  <div id="home" class="container-main">
    <h2 class="list-header">Welcome</h2>
    <div id="home-images">
      <img src="../../assets/image-sq-4.jpg">
      <img src="../../assets/image-sq-1.jpg">
      <img src="../../assets/image-sq-5.jpg">
      <img src="../../assets/image-sq-7.jpg">
      </div>
    <p class="content">Our Seasonly app helps you to consume food in a more environmentally conscious way by identifying and purchasing foods that are in season! Search for ingredients that are in season this month, find recipes using those items and automatically add them to your shopping list. You can also save your favorite recipes!</p>
    <blockquote>"Supporting local food production is so much healthier for people. It's better for the local economy, and it's a lot of fun."<br />
    - Jack Johnson</blockquote>


   <a class="ghost-button" href="/#/search">Get Started</a>


  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.list-header {
  font-family: 'Sedgwick Ave', cursive;
  font-size: 2em;
  color: #fff;
  text-align: center;
  padding-top: 20px;
}
p {
  color: #fff;
  font-size: 1.15em;
}
#home-images img {
 margin-left: 10px;
 margin-right: 5px;
 border-radius: 12px;
 border: 1px solid white;
 width: 160px;

}
blockquote {
color: #fff;
font-size: .9em;
font-style: italic;
margin-left: 10%;
margin-right: 10%;
padding-top: 10px;
border-top: 1px solid white;
}
</style>
