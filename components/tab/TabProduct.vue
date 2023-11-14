<template>
  <div class="flex flex-col">
    <div class="mt-5 px-10 flex flex-col items-center justify-center">
      <h2 class="font-bold text-4xl mb-4">
        SÁCH
      </h2>
      <!-- <p class="font-medium">
        Mauris luctus nisi sapien tristique dignissim ornare
      </p> -->
    </div>
    <div class="tab_product">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" class="font-semibold">
          <ProductsList :products="newProducts" />
          <!-- <div class="flex justify-center items-center py-6">
            <h2 class="text-black lg:text-2xl cursor-pointer text-xl hover:text-orange transition-all" @click="searchSubject">
              SÁCH
            </h2>
          </div> -->
        </a-tab-pane>
        <a-tab-pane key="2" class="font-semibold" force-render>
          <ProductsList :products="bestProducts" />
          <!-- <div class="flex justify-center items-center py-6">
            <h2 class="text-black lg:text-2xl cursor-pointer text-xl hover:text-orange transition-all" @click="searchSubject">
              SÁCH
            </h2>
          </div> -->
        </a-tab-pane>
        <a-tab-pane key="3">
          <ProductsList :products="onSaleProducts" />
          <!-- <div class="flex justify-center items-center py-6">
            <h2 class="text-black lg:text-2xl cursor-pointer text-xl hover:text-orange transition-all" @click="searchSubject">
              SÁCH
            </h2>
          </div> -->
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import ProductsList from '../products_list/ProductsListContainer.vue'
// import { getByTitle } from '@/assets/filters'
export default {
  components: {
    ProductsList
  },
  data () {
    return {
      newProducts: [],
      bestProducts: [],
      onSaleProducts: []
    }
  },
  mounted () {
    this.getNewProducts()
    this.getBestProducts()
    this.getOnSaleProducts()
  },
  methods: {
    searchSubject () {
      this.$router.replace({ path: '/search', query: { keyword: '' } })
    },
    callback (key) {
      console.log(key)
    },
    async getNewProducts () {
      const product = await this.$api.product.searchProduct({ search: '', page: 1, limit: 8, sort: '-createdAt' })
      this.newProducts.push(...product.products.products)
    },
    async getBestProducts () {
      const product = await this.$api.product.searchProduct({ search: '', page: 1, limit: 8, sort: '-sold' })
      this.bestProducts.push(...product.products.products)
    },
    async getOnSaleProducts () {
      const product = await this.$api.product.searchProduct({ search: '', page: 1, limit: 8, sort: '_id' })
      this.onSaleProducts.push(...product.products.products)
    }

  }
}
</script>

<style lang="scss">
  .tab_product{

    .ant-tabs-nav-wrap{
        @apply mt-3;
    }
    .ant-tabs-bar{
        @apply border-0
    }
    .ant-tabs-nav-scroll{
        @apply w-full flex justify-center;

    }
    .ant-tabs-nav .ant-tabs-tab-active{
        @apply text-orange;
    }
    .ant-tabs-tab{
        @apply font-semibold text-black text-[1rem] leading-6;
    }
    .ant-tabs-tab:hover {
        @apply text-orange
    }
    .ant-tabs-tab-active{
        @apply text-orange
    }
    .ant-tabs-ink-bar{
        @apply bg-orange
    }
    .ant-tabs-nav .ant-tabs-tab:hover{
        @apply text-orange
    }
  }
</style>
