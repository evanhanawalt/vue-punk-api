<template>
  <div id="app">
    <h1>Punk API</h1>

    <button
      v-if="beers.length == 0"
      class="button"
      :class="{disabled:buttonIsDisabled}"
      @click="getBeers"
    >Load Some Beers!</button>
    <div class="options-container" v-else>
      <select v-model="sortBy">
        <option value disabled selected>Sort by...</option>
        <option value="first_brewed">First Brew Date (most recent)</option>
        <option value="abv">ABV</option>
      </select>
 

      <select v-model="maxColumns">
        <option value disabled selected>Max Column #...</option>
        <option value="4">4 Col</option>
        <option value="2">2 Col</option>
      </select>
    </div>
    <square :hidden="!loading"></square>

    <transition-group class="beers" :class="{'beers--2-col':is2Column}" name="fade">
      <BeerCard
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
      maxColumns:4,
      beers: []
    };
  },
  computed: {
    is2Column:function(){
      if (this.maxColumns == 2){
        return true;
      } else {
        return false;
      }
    }
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
        { height: "80%", width: "80%" }
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.beers--2-col{
  grid-template-columns: 1fr 1fr;
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


.options-container{
  display:flex;
  justify-content: space-between;
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


@media only screen and (max-width: 900px) {
  .beers {
    grid-template-columns: 1fr 1fr;
  }
}



@media only screen and (max-width: 500px) {
  .beers {
    grid-template-columns: 1fr;
  }
}
</style>
