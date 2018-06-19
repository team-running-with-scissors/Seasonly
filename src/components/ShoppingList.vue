<template>
  <div id="shopping-list">
    <form @submit.prevent="handleSave">
      <div
          :class="item.selected ? 'checked' : 'unchecked'"
          v-for="item in shoppingList"
          :key="item.name"
          @click.prevent="item.selected = !item.selected"
        >
        {{ item.name }}
      </div>
      <button type="submit">Save</button>
    </form>
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
  methods: {
    handleSave() {
    
    }
  },
  created() {
    this.shoppingList = this.getFromMasterList();
  }
};
</script>

<style>
.checked {
  cursor: pointer;
  text-decoration: line-through;
}
.unchecked {
  cursor: pointer;
  text-decoration: none;
}
</style>