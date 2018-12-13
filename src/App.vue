<template>
  <div id="app">
    <div class="content">
      <h1>Punk API</h1>
    </div>

    <button
      class="button is-primary"
      v-bind:disabled="disableButton"
      @click="getBeers"
    >Load Some Beers!</button>
    <div class="beers columns is-multiline">
      <BeerCard
        class="column is-one-quarter"
        v-for="beer in beers"
        v-bind:key="beer.id"
        v-bind="beer"
      ></BeerCard>
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
      disableButton: false,
      beers: [{}]
    };
  },
  methods: {
    getBeers: function() {
      /* eslint-disable */
      const self = this;
      this.disableButton = true;

      axios
        .get(API_ENDPOINT)
        .then(function(response) {
          // handle success
          self.beers = response.data;
          console.log(response.data);
          this.beers.push({id:1})
        })
        .catch(function(error) {
          // handle error
        });
    }
  }
};
</script>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style lang="scss">
$primary: #e75a3a;
@import "../node_modules/bulma/bulma.sass";

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.beers {
  margin: 1em;
}
</style>