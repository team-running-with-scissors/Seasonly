<template>
  <div id = "user-profile">
    <shopping-list
      :clearMasterList="clearMasterList"
      :shoppingList="shoppingList"
      :updateMasterList="updateMasterList"
    />
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
    updateMasterList: {
      type: Function,
      required: true
    },
    clearMasterList: {
      type: Function,
      required: true
    },
    shoppingList: Array
  }
};
</script>

<style>

</style>
