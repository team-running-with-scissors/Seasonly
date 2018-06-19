<template>
  <div id="shopping-list">
    {{ shoppingList }}
  </div>
</template>

<script>
export default {
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