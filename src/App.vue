<template>
  <div id="app">
    <div class>
      <h1>Punk API</h1>
    </div>

    <button class="button" :class="{disabled:buttonIsDisabled}" @click="getBeers">Load Some Beers!</button>

    <div class="beers">
      <BeerCard class="col" v-for="beer in beers" v-bind:key="beer.id" v-bind="beer"></BeerCard>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BeerCard from "./components/BeerCard.vue";
const API_ENDPOINT = "https://api.punkapi.com/v2/beers";

export default {
  name: "app",
  components: {
    BeerCard
  },
  data: function() {
    return {
      buttonIsDisabled: false,
      beers: []
    };
  },
  methods: {
    getBeers: function() {
      const self = this;
      this.buttonIsDisabled = true;
      axios
        .get(API_ENDPOINT)
        .then(function(response) {
          // handle success
          self.beers = response.data;
          this.beers.push({ id: 1 });
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
$color-primary: #e75a3a;
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.beers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.col {
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 1;
}

.button {
  background-color: $color-primary;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
