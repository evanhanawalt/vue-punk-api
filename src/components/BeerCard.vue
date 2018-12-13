<template>
  <div>
    <div class="box">
          <img :src="image_url" alt="Placeholder image">
          <div class="content">
            <p>{{name}}</p>
            <p>{{abv}} %</p>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeerCard",
  props: ["image_url", "abv", "id","name"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

div.content {
  display: flex;
  justify-content: space-between;
}

</style>
