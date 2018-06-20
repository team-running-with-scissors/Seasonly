<template>
  <div id="shopping-list">
    <form>
      <ul>
        <li
            v-if="userShoppingList"
            v-for="item in userShoppingList"
            :class="item.selected ? 'checked' : 'unchecked'"
            :key="item.item"
            @click.prevent="item.selected = !item.selected"
          >
          {{ item.item }}
        </li>
      </ul>
      <div id="buttons">
        <button @click.prevent="handleClear">Clear List</button>
        <button @click.prevent="handleClearSelected">Clear Selected Items</button>
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
    handleClearSelected() {
      let tempList = this.userShoppingList.filter(el => el.selected);
      console.log('selecte ditems are', tempList);
      this.deleteFromMasterList(tempList);
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
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 64, 128, .69);
  padding: 3px;
}
ul {
  list-style: none;
}
</style>