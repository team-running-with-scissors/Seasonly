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

    };
  },
  created() {

  }
};
</script>

<style>

</style>