<template>
  <div class="container-main" id="about">
    <h1>Team Running with Scissors</h1>
    <h3>Wow look at those guys!</h3>
    <div @click.stop="rain(1)">
      <div class="image" style="backgroundColor=red">
      </div>
      <p>Mark is one cool dude</p>
    </div>
    <div @click.stop="rain(2)">
      <div class="image" style="backgroundColor=red">
      </div>
      <p>Robert is one cool dude</p>
    </div>
    <div @click.stop="rain(3)">
      <div class="image" style="backgroundColor=red">
      </div>
      <p>Erik is one cool dude</p>
    </div>
    <div @click.stop="rain(4)">
      <div class="image" style="backgroundColor=red">
      </div>
      <p>Robyn is one cool dude</p>
    </div>
  </div>
</template>

<script>
import { makeItRain, makeItStop } from '../food-rain/rain.js';
export default {
  methods: {
    rain(member) {
      makeItRain(member);
    },
    unrain() {
      makeItStop();
    }
  }
};
</script>

<style scoped>
h1, h3, p {
  color: #fff;
}
.image{
  width: 50px;
  height: 50px
}
</style>