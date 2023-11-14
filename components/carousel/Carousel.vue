<template>
  <a-carousel arrows>
    <div
      slot="prevArrow"

      class="custom-slick-arrow"
      style="left: 10px;zIndex: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <div class="product-image-wrapper" v-for="item in img" :key="item">
      <img :src="item" alt="photo">
    </div>
    <!-- <div><h3>2</h3></div> -->
  </a-carousel>
</template>
<script>

export default {
  props: ['img'],
  watch: {
    img () {
      console.log('img', this.img)
    }
  }
}
</script>
<style lang="scss">
/* For demo */
.ant-carousel{
    @apply lg:ml-5 lg:w-96 sm:w-72 w-72;
    .slick-slide {
      // @apply rounded-sm;
    text-align: center;
    // height: 160px;
    // line-height: 160px;
    // background: #364d79;
    overflow: hidden;
  }
    .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: black;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .custom-slick-arrow:before {
  display: none;
  }
  .custom-slick-arrow:hover {
  opacity: 0.5;
  }
  .slick-slide h3 {
  color: #fff;
  }
}

</style>
