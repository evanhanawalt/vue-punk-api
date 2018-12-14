<template>
  <div class="modal-flex">
    <img :src="image_url" alt="beer modal image">
  </div>
</template>

<script>
export default {
  name: "BeerModal",
  props: ["image_url"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
div.modal-flex {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
img {
  max-height: 100%;
}
</style>
