<template>
  <div class="container-main" id="about">
    <h1>Team Running with Scissors</h1>
    <h3>Wow look at those guys!</h3>
    <div id="mark" class="profiles">
      <img @click.prevent="rain(1)" id="mark-pic" class="image" src="../../assets/mark_head.jpg">
      <p class="text">Mark is an aspiring Javascript developer - getting through Alchemy one class at a time. Trying to turn my old age into a feature versus a bug! Follow me on Twitter @markalope - tweets about tech, music, life and of course walruses.</p>
    </div>
    <div id="robert" class="profiles">
      <img @click.prevent="rain(2)" id="robert-pic" class="image" src="../../assets/robert_head.jpg">
      <p> Robert Thompson is a web developer from Portland, Oregon. You can often times find him lamenting over the fate of the Portland Trailblazers and his sleep schedule. </p>
    </div>
    <div id="erik" class="profiles">
      <img @click.prevent="rain(3)" id="erik-pic" class="image" src="../../assets/erik.jpg">
      <p>Erik, Midwest born and raised (Fargo) sauntered around for years and wound up in Portland searching for a successful life in music. He soon realized that he wanted to make music for the sake of art, not money. So he decided to fall back on his first passion, computers/programming, dove in head first, and has dedicated all of this spare time to learning the ropes of Web Development. He plans to continue to push himself in hopes of landing a solid job so he can dedicate his spare time to focus on helping himself and others create art for the sake of art.</p>
    </div>
    <div id="robyn" class="profiles">
      <img @click.prevent="rain(4)" id="robyn-pic" class="image" src="../../assets/robyn_head.jpg">
      <p>Robyn is a web developer currently training and honing his skills with Alchemy Code Lab. He enjoys playing video games, eating good food (which he sometimes cooks), listening to his favorite podcasts, and traveling.</p>
    </div>
  </div>
</template>

<script>
import { makeItRain } from '../food-rain/rain.js';
export default {
  props: {
    toggleRain: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      member: []
    };
  },
  methods: {
    rain(id) {
      console.log('mememner', this.member);
      if(!this.member[id - 1].rain) {
        makeItRain(id);
        this.member[id - 1].rain = true;
      }
      this.toggleRain();
    }
  },
  created() {
    for(let i = 1; i < 5; i++) {
      this.member.push({ rain: false });
    }
  }
};
</script>

<style scoped>
h1, h3, p {
  color: #fff;
}
.image{
   height: 150px;
}
.profiles{
  display: block;
  margin-bottom: 20px;
}

#mark {
  float: left;
}
#mark-pic {
  float: left;
  border-radius: 50%;
}

#robert {
  float: right;
}
#robert-pic {
  float: right;
  border-radius: 50%;
}

#erik {
  float: left;
}
#erik-pic {
  float: left;
  border-radius: 50%;
}

#robyn {
  margin-bottom: 55px;
}
#robyn-pic {
  float: right;
  border-radius: 50%;
}


</style>