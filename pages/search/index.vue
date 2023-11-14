<template>
  <div class="flex flex-col">
    <header class="banner_single mb-10">
      <div class="flex justify-center absolute items-center w-full flex-col">
        <h2 class="text-black text-3xl font-semibold">
          SÁCH
        </h2>
        <span class="text-orange text-lg">
          <nuxt-link tag="span" class="text-black text-lg cursor-pointer" to="/">
            TRANG CHỦ
          </nuxt-link>
          / LỊCH SỬ - VĂN HỌC
        </span>
      </div>
    </header>
    <div class="flex flex-col  my-10">
      <div class="grid sm:grid-cols-2 space-y-1 lg:px-12 px-4">
        <div class="text-[1rem]">
          <p>Có {{ listProduct.total ? listProduct.total : 0 }} sản phẩm liên quan <span class="text-black font-medium"> #{{ querySearch }}</span> </p>
        </div>
        <div class=" grid">
          <div class="col-span-3 flex sm:justify-end sm:space-x-5 space-x-1">
            <button class="sm:px-5 py-2  btn_sort px-2" @click="sortNew">
              Mới
            </button>
            <button class="sm:px-5 py-2  btn_sort px-2" @click="sortPrice">
              Giá
            </button>
            <button class="sm:px-5 py-2  btn_sort px-2 " @click="sortView">
              Lượt Xem
            </button>
            <button class="sm:px-5 py-2  btn_sort px-2" @click="sortSold">
              Đã Bán
            </button>
            <button class="icon-grid_search" :class="!isGrid ? 'icon-grid_click':''" @click="changeGrid(false)">
              <i class="fa-solid fa-list  text-black text-lg" Thêm vào giỏ hàng/>
            </button>
            <button class=" icon-grid_search" :class="isGrid ? 'icon-grid_click':''" @click="changeGrid(true)">
              <i class="fas fa-th text-black text-lg" />
            </button>
          </div>
        </div>
      </div>
      <hr class="text-[#aaaaaa] bg-[#aaaaaa] h-[1px] my-4">
      <ProductsList v-if="isGrid===true" :products="listProduct.products" />
      <ListOne v-else :products="listProduct.products" />
      <div v-if=" listProduct.total" class="flex justify-center my-2">
        <a-pagination v-model="currentSearch" :total="listProduct.pages*8" show-less-items :page-size="8" @change="onChangeSearch" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from '@/components/products_list/ProductsListContainer.vue'
import ListOne from '@/components/modalsearch/ListOne.vue'

export default {
  components: {
    ProductsList,
    ListOne
  },
  data () {
    return {
      listProduct: {},
      query: null,
      currentSearch: 1,
      isGrid: false
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.keyword
    },
    querySubject () {
      return this.$route.query.subject
    }
  },
  watch: {
    querySearch () {
      this.productSearch(this.currentSearch, '-_id')
      console.log('change')
    },
    querySubject () {
      this.productSearch(this.currentSearch, '-_id')
      console.log('change')
    }
  },
  mounted () {
    this.productSearch(this.currentSearch, '-_id')
  },
  methods: {
    async productSearch (page, sort) {
      try {
        const queryNull = ''
        const products = await this.$api.product.searchProduct(
          {
            search: this.querySearch ? this.querySearch : queryNull,
            subject: this.querySubject ? this.querySubject : queryNull,
            page,
            limit: 8,
            sort
          })
        this.listProduct = products.products
      } catch (error) {
        console.log(error)
      }
    },
    onChangeSearch (value) {
      console.log(value)
      this.productSearch(this.currentSearch, '-_id')
    },
    sortSold () {
      this.productSearch(this.currentSearch, '-sold')
    },
    sortNew () {
      this.productSearch(this.currentSearch, '-_id')
    },
    sortPrice () {
      this.productSearch(this.currentSearch, '-price')
    },
    sortView () {
      this.productSearch(this.currentSearch, '-view')
    },
    changeGrid (value) {
      this.isGrid = value
    }
  }
}
</script>

<style lang="scss">
  .banner_single{
    background-image: url('@/static/banner/banner_single.png');
    position: relative;
    background-repeat: no-repeat;
    background-size: cover cover;
    padding: 100px 0 140px 0;
    width: 100%;
  }
  .icon-grid_search{
    @apply  border rounded-sm h-10 w-10 flex justify-center items-center cursor-pointer hover:bg-blue transition-all hover:border-none ;
  }
  .icon-grid_search:hover{
    i{
      @apply text-white;
    }
  }
  .icon-grid_click{
    @apply bg-blue border-none transition-all shadow-md scale-105;
    i{
      @apply text-white scale-105;
    }
  }
  .btn_sort{
      @apply rounded-3xl border-[#696969]  border font-medium ;
  }
  .btn_sort:hover{
      @apply border-[#51bafc] text-blue transition-all shadow-md
  }
  .btn_sort:focus{
     @apply border-[#51bafc] text-blue transition-all shadow-md scale-105;
  }

</style>
