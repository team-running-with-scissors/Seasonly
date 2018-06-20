<template>
  <div id="shopping-list">
    <form>
      <ul v-if="userShoppingList.length > 0">
        <h2 class="list-header">Shopping List</h2>
        <li
            v-for="(item, index) in userShoppingList"
            :class="item.selected ? 'checked' : 'unchecked'"
            :key="index"
            @click.prevent="item.selected = !item.selected"
          >
          {{ item.item }}
        </li>
      </ul>
      <div v-else>
        <h1>Please add items to your shopping list.</h1>
      </div>
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
      this.updateMasterList(this.userShoppingList);
    },
    handleClearSelected() {
      let tempList = this.userShoppingList.filter(el => el.selected);
      console.log('selected items are', tempList);
      this.deleteFromMasterList(tempList);
    },
    handleClear() {
      this.clearMasterList();
    }
  }
};
</script>

<style scoped>
#shopping-list {
  width: 333px;
  margin: 20px auto;
  background: rgba(0, 0, 0, .69);
  border-radius: 20px;
}
.list-header {
  font-family: 'Sedgwick Ave', cursive;
  font-size: 2em;
  color: #fff;
  text-align: center;
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
  margin-left: 0px;
}
li {
  border-bottom: 1px solid #fff;
  padding: 10px;
}
</style>