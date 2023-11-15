<template>
  <div class="m-5 lg:px-8 px-4">
    <div
      :class="`grid grid-cols-${amountProductPerRow.default} md:grid-cols-${amountProductPerRow.md} lg:grid-cols-${ amountProductPerRow.lg } gap-8`">
      <div v-for="product in products" :key="product.id">
        <Products :detail="false" :product="product" />
      </div>
    </div>
    <div v-if="products.length === 0" class="text-center">
      <h2 class="text-2xl">
        {{ noProductLabel }}
      </h2>
    </div>
    <!-- <div class="flex justify-center items-center pt-6 pb-4">
      <h2 class="text-black lg:text-2xl cursor-pointer text-xl hover:text-orange transition-all">
        VIEW ALL PRODUCTS
      </h2>
    </div> -->
  </div>
</template>

<script>
import Products from '../Products'
export default {
  name: 'ProductsList',

  components: {
    Products
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    products: {
      type: Array,
      default: () => []
    },
    amountProductPerRow: {
      type: Object,
      default: () => ({
        default: 1,
        md: 2,
        lg: 4
      })
    }
  },

  data () {
    return {
      id: '',
      noProductLabel: 'No product found'
    }
  }
}
</script>

<style lang="scss">
.img-wrapper {
  img {
    width: 280px;
    height: 400px;
  }
}
</style>
