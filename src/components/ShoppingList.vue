<template>
  <div id="shopping-list">
    <form>
      <ul>
        <li
            v-if="userShoppingList"
            :class="item.selected ? 'checked' : 'unchecked'"
            v-for="item in userShoppingList"
            :key="item.name"
            @click.prevent="item.selected = !item.selected"
          >
          {{ item.item }}
        </li>
      </ul>
      <div id="buttons">
        <button @click.prevent="handleClear">Clear List</button>
        <button @click.prevent="handleUpdate">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
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
      type : Function,
      required : true
    },
    userShoppingList: Array
  },
  methods: {
    handleUpdate() {
      
    },
    handleDelete() {
      // Get selected items and send
      this.deleteFromMasterList();
    },
    handleClear() {
      console.log('in the shoppinglist');
      this.clearMasterList();
    }
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
ul {
  list-style: none;
}
</style>