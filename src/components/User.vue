<template>
  <div id = "user-profile">
    <shopping-list :getFromMasterList = "getFromMasterList" />
    <FavoriteRecipes/>
  </div>
</template>

<script>
import ShoppingList from './ShoppingList.vue';
import FavoriteRecipes from './FavoriteRecipes.vue';

export default {
  components: {
    ShoppingList,
    FavoriteRecipes
  },
  props: {
    getFromMasterList: {
      type: Function,
      required: true
    }
  }, 
  data() {
    return {
      shoppingList: null
    };
  },
  created() {
    this.shoppingList = this.getFromMasterList;
  }
};
</script>

<style>

</style>
