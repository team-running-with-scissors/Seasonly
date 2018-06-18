<template>
<div>
  <div id="container-whole">
    <div id="container-search">
      <input v-model="searchTerm">
      <button @click.prevent="handleSearch">Search!</button>
    </div>
    <div id="container-main">

    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      searchTerm: null
    };
  },
  methods: {
    handleSearch() {
      alert('hi');
    }
  }
}
</script>

<style scoped>
#container-search {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
