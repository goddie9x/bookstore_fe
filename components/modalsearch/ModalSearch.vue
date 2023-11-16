<template>
  <div :class="[ openModal ? 'fixed flex modal-animation ' : 'hidden', 'modal' ]">
    <div class="modal-wrapper-search flex flex-col">
      <div class=" right-0 absolute p-5">
        <button class="delete bg-white w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
      <div class="h-full input-search flex flex-col justify-center items-center">
        <form class="grid grid-cols-12 gap-10 w-full " @submit.prevent="searchKeyWord(valueSearch)">
          <a-input
            v-model="valueSearch"
            placeholder="Type keyword here"
            class="col-span-4 mb-5 rounded-none font-medium text-white text-xl bg-transparent border-l-0 border-r-0 border-t-0 border-b-2"
            @keyup="onSearch"
          />
          <a-select
            ref="category"
            v-model="category"
            @change="onSearch"
            class="col-span-2 text-light"
          >
            <a-select-option v-for="(item,index) in listCategories" :key="index" :value="item">{{ item }}</a-select-option>
          </a-select>
          <a-select
            ref="subject"
            v-model="subject"
            @change="onSearch"
            class="col-span-2"
          >
            <a-select-option v-for="(item,index) in listSubjects" :key="index" :value="item">{{ item }}</a-select-option>
          </a-select>
          <a-select
            ref="priceRangeIndex"
            v-model="priceRangeIndex"
            @change="onSearch"
            class="col-span-2"
          >
            <a-select-option v-for="(item,index) in priceRanges" :key="index" :value="index">{{ item.label }}</a-select-option>
          </a-select>
          <button class="mb-5 col-span-2 text-white text-lg font-normal" type="submit">
            Search
          </button>
        </form>
        <div class="mt-2 w-2/3 max-h-60 space-y-3 overflow-y-auto">
          <ul v-for="(item,index) in data.products" :key="index">
            <div class="flex space-x-6">
              <div class="flex cursor-pointer">
                <img :src="item.images[0]" alt="photo" class="w-20">
              </div>
              <div class="text-white font-medium text-lg">
                <p @click="closeModal">
                  <nuxt-link
                    :to="{
                      name:'product_detail-id',
                      params: {
                        id: item._id
                      }
                    }"
                    class="cursor-pointer hover:text-yellow_hover"
                  >
                    {{ item.name }}
                  </nuxt-link>
                </p>
                <p class=" font-normal">
                  ${{ item.price }}
                </p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',

  data () {
    return {
      valueSearch: '',
      data: {},
      listCategories: [],
      listSubjects: [],
      priceRanges: [],
      category: '',
      subject: null,
      priceRangeIndex: null
    }
  },
  mounted () {
    this.getSearchSelections()
  },
  computed: {
    openModal () {
      if (this.$store.getters.isSearchModalOpen) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    closeModal () {
      this.$store.commit('showSearchModal', false)
      console.log('ok')
    },
    onSearch () {
      this.getProductSearchKeyUp()
    },
    async getSearchSelections () {
      try {
        const res = await this.$api.product.getSearchSelections()
        const searchSelections = res.data
        if (searchSelections) {
          this.listCategories = searchSelections.listCategories
          this.listSubjects = searchSelections.listSubjects
          this.priceRanges = searchSelections.priceRanges
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getProductSearchKeyUp () {
      try {
        const priceRange = this.priceRanges&&this.priceRangeIndex?this.priceRanges[this.priceRangeIndex]:null
        const restData = await this.$api.product.searchProduct({
          search: this.valueSearch,
          subject: this.subject,
          minPrice: priceRange?.value?.minPrice ?? '',
          maxPrice: priceRange?.value?.maxPrice ?? '',
          category: this.category,
          page: 1,
          limit: 20,
          sort: '-_id'
        })
        this.data = restData.products
      } catch (error) {
        console.log(error)
      }
    },
    searchKeyWord (keyword) {
      const subject = ''
      console.log('search keyWord: ', keyword)
      this.$router.replace({ path: '/search', query: { keyword, subject } })
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
  .modal-wrapper-search{
    background: #f83c91;
  }
  .fa-exclamation-circle {
    @apply text-red;
  }
  .fa-check {
    @apply text-green;
  }
  .input-search{
    .ant-input{
      @apply text-center;
    }
    .ant-input:hover{
      @apply border-x-0 border-t-0 bg-transparent border-b-[yellow];
      border-right-width: 0px !important;

    }
    .ant-input:focus {
      @apply border-l-0 border-r-0 border-t-0 border-b-2 border-yellow shadow-none outline-0;
        border-right-width: 0px !important;
    }
  }
  .list-search{
    .ant-list-item-meta-title{
      a{

        @apply text-white font-medium;
      }
    }
    .ant-list-item-meta-description{
      @apply text-white font-medium;
    }
  }
</style>
