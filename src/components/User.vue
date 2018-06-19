<template>
  <div id = "user-profile">
    <shopping-list :getFromMasterList = "getFromMasterList" />
  </div>
</template>

<script>
import ShoppingList from './ShoppingList.vue';

export default {
  components: {
    ShoppingList
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
