<template>
  <div id = "user-profile">
    <div>
    <shopping-list
      v-if="userShoppingList"
      :userShoppingList="userShoppingList"
      :updateMasterList="updateMasterList"
      :clearMasterList="clearMasterList"
      :deleteFromMasterList="deleteFromMasterList"
    />
    
    <div v-else>
      <p>Please add indgredients to your shopping list.</p>
    </div>
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
    deleteFromMasterList: {
      type: Function,
      required: true
    },
    clearMasterList: {
      type: Function,
      required: true
    },
    userShoppingList: Array
  },
};
</script>

<style scoped>

</style>
