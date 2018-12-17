<template>
  <div class="beer-card">
    <div class="image-container" v-on:click="$emit('show-modal', image_url)">
      <img :src="image_url" :alt="name">
    </div>
    <div class="description-container">
      <p>{{name}}</p>
      <p>{{abv}} %</p>
    </div>    
    <div class="description-container">
      <p>First Brewed</p>
      <p>{{first_brewed}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeerCard",
  props: ["image_url", "abv", "id", "name", "first_brewed"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
.beer-card{
    margin: 1em;
}
.image-container {
  border: 2px solid #333;

}
img {  
  max-height: 250px;
  margin: 1em;
}
.description-container {
  display: flex;
  justify-content: space-between;
  
}
</style>
