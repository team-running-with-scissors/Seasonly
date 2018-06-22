<template>
  <div id="shopping-list" class="container-main">
    <form>
      <ul v-if="userShoppingList.length > 0">
        <h2 class="list-header">Your Shopping List</h2>
        <li
            v-for="(item, index) in userShoppingList"
            :class="item.selected ? 'checked' : 'unchecked'"
            :key="index"
            @click.prevent="handleUpdate(item)"
          >
          {{ item.item }}
        </li>
      </ul>
      <div v-else id="please-add">
        <h2>Please add items to your shopping list.</h2>
      </div>
      <div id="buttons">
        <button class="ghost-button" @click.prevent="handleClear">Clear List</button>
        <button class="ghost-button" @click.prevent="handleClearSelected">Clear Selected</button>
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
    handleUpdate(item) {
      item.selected = !item.selected;
      this.updateMasterList(this.userShoppingList);
    },
    handleClearSelected() {
      let tempList = this.userShoppingList.filter(el => el.selected);
      this.deleteFromMasterList(tempList);
    },
    handleClear() {
      this.clearMasterList();
    }
  }
};
</script>

<style scoped>
.list-header {
  font-family: 'Sedgwick Ave', cursive;
  font-size: 2em;
  color: #fff;
  text-align: center;
  padding-top: 0px;
}
#please-add {
  padding-top: 20px;
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
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  width: 300px;
  /* background-color: rgba(0, 0, 0, .69); */
  padding-bottom: 20px;
}
ul {
  list-style: none;
  padding: 0 50px;
}
li {
  margin: auto;
  max-width: 200px;
  border-bottom: 1px solid #fff;
  padding: 10px; 
}
li:hover {
  
  background-color: rgba(255, 255, 255, .69);
  color: rgb(21, 82, 99);
}
.ghost-button {
  width: fit-content;
  padding: 3px 13px;
  font-size: 1rem;
}
</style>