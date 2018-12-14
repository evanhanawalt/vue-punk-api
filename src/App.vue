<template>
  <div id="app">
    <h1>Punk API</h1>

    <button
      v-if="beers.length == 0"
      class="button"
      :class="{disabled:buttonIsDisabled}"
      @click="getBeers"
    >Load Some Beers!</button>
    
    <select v-else v-model="sortBy">
      <option value disabled selected>Sort by...</option>
      <option value="first_brewed">First Brew Date (most recent)</option>
      <option value="abv">ABV</option>
    </select>

    <square :hidden="!loading"></square>

    <transition-group class="beers" name="fade">
      <BeerCard
        class="col"
        v-for="beer in beers"
        v-bind:key="beer.id"
        v-bind="beer"
        v-on:show-modal="showModal($event)"
      ></BeerCard>
    </transition-group>

  </div>
</template>

<script>
import axios from "axios";
import BeerCard from "./components/BeerCard.vue";
import BeerModal from "./components/BeerModal.vue";
const API_ENDPOINT = "https://api.punkapi.com/v2/beers";

export default {
  name: "app",

  components: {
    BeerCard, // eslint-disable-next-line
    BeerModal
  },
  data: function() {
    return {
      buttonIsDisabled: false,
      loading: false,
      sortBy: "",
      beers: []
    };
  },
  methods: {
    getBeers: function() {
      const self = this;
      // start loading indication
      this.buttonIsDisabled = true;
      this.loading = true;
      axios
        .get(API_ENDPOINT)
        .then(function(response) {
          // handle success
          self.beers = response.data;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        })
        .then(function() {
          // finally end loading indication
          self.loading = false;
        });
    },
    showModal: function(image_url) {
      this.$modal.show(
        BeerModal,
        { image_url: image_url },
        { height: "80%", width:"80%" }
      );
    }
  },
  watch: {
    sortBy: function() {
      if (this.sortBy == "abv") {
        // sort by  abv
        this.beers.sort(function(a, b) {
          return b.abv - a.abv;
        });
      } else {
        // sort by date(parsed from string)
        this.beers.sort(function(a, b) {
          let bSplit = b.first_brewed.split("/");
          let aSplit = a.first_brewed.split("/");
          return (
            new Date(bSplit[1], bSplit[0]) - new Date(aSplit[1], aSplit[0])
          );
        });
      }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
