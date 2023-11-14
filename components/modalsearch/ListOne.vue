<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div v-for="item in products" :key="item._id">
      <OneProduct :product="item" />
    </div>
    <div v-if="products.length === 0" class="text-center">
      <h2 class="text-2xl text-black">
        No product found
      </h2>
    </div>
  </div>
</template>

<script>
import OneProduct from './OneProduct.vue'
export default {
  components: {
    OneProduct
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    //   products: [
    //     {
    //       _id: 1,
    //       name: 'T-Shirt Form Girls',
    //       description: '  Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Proin eget tortor risus. Nulla porttitoraccumsan tincidunt. Pellentesque in ipsum id orci porta dapibus.',
    //       rating: 5,
    //       category: 'black',
    //       images: ['@/static/img_demo.png'],
    //       price: 100,
    //       originalPrice: 80,
    //       sold: 10,
    //       view: 100
    //     },
    //     {
    //       _id: 2,
    //       name: 'T-Shirt Form Girls',
    //       description: '  Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Proin eget tortor risus. Nulla porttitoraccumsan tincidunt. Pellentesque in ipsum id orci porta dapibus.',
    //       rating: 5,
    //       category: 'black',
    //       images: ['@/static/img_demo.png'],
    //       price: 100,
    //       originalPrice: 80,
    //       sold: 10,
    //       view: 100
    //     }
    //   ]
    }
  }
}
</script>
