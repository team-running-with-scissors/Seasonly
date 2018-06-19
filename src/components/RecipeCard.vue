<template>
<div>
<div id="container-main">
  <div id="container-recipe">
    <div id="exit" @click.prevent="handleZoom">
      <b>X</b>
    </div>
    <h1>{{ selectedRecipe.Title }}</h1>
    <div id="container-details">
      <div id="ingredients">
        <ul>
          <li
            v-for="ingredient in selectedRecipe.Ingredients"
            :key="ingredient.Name"
          >
            {{ ingredient.Name }}
          </li>
        </ul>
      </div>
      <div id="instructions">
        <p>{{ selectedRecipe.Instructions }}</p>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
// import './main.css';

export default {
  props: {
    toggleRecipe: {
      type: Function,
      require: true
    },
    selectedRecipe: Object
  },
  data() {
    return {
      newUser: true,
      creds: { username : '', password : '' },
      label: null,
      show: false,
      valid: false
    };
  },
  methods: {
    handleZoom() {
      this.toggleRecipe();
    }
  }
};
</script>
<style scoped>
#container-recipe {
  color: white;
  background: steelblue;
  border: 1px solid black;
  border-radius: 13px;
  padding: 13px;
  width: fit-content;
  z-index: 1;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 3px black;
}
#container-main {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .69);
}
#container-details {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
#exit {
  float: right;
  position: absolute;
  cursor: pointer;
  border-top: 1px solid gray;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid gray;
  padding: 0 3px;
  background-color: slategrey;
}
#ingredients {
  float: left;
}
#instructions {
  max-width: 400px;
  float: right;
  padding: 13px;
  background-color: rgba(0, 0, 0, .69);
}
ul {
  /* list-style: none; */
  font-size: .75rem;
  text-align: left;
  padding-right: 33px;
}
</style>
