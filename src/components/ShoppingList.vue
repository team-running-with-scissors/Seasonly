<template>
  <div id="shopping-list">
    <form>
      <div
          :class="item.selected ? 'checked' : 'unchecked'"
          v-for="item in shoppingList"
          :key="item.name"
          @click.prevent="item.selected = !item.selected"
        >
        {{ item.name }}
      </div>
      <div id="buttons">
        <button @click.prevent="handleClear">Clear List</button>
        <button @click.prevent="handleSave">Save</button>
      </div>
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
#shopping-list {
  width: 333px;
  margin: auto;
  background: rgba(255, 255, 255, .69);
}
.checked {
  cursor: pointer;
  text-decoration: line-through;
}
.unchecked {
  cursor: pointer;
  text-decoration: none;
}
#buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>