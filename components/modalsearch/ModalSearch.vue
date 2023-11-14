<template>
  <div :class="[ openModal ? 'fixed flex modal-animation ' : 'hidden', 'modal' ]">
    <div class="modal-background" />
    <div class="modal-wrapper-search flex flex-col">
      <div class=" right-0 absolute p-5">
        <button class="delete bg-white w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
      <div class="h-full input-search flex flex-col justify-center items-center">
        <form class="w-full  flex flex-col justify-center items-center" @submit.prevent="searchKeyWord(valueSearch)">
          <a-input
            v-model="valueSearch"
            placeholder="Type keyword here"
            class="w-2/3 mb-5 rounded-none font-medium text-white text-xl bg-transparent border-l-0 border-r-0 border-t-0 border-b-2"
            @keyup="onSearch(valueSearch)"
          />
          <button class="bg-transparent text-grey_light/10 text-lg font-normal" type="submit">
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
      data: {}
    }
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
    onSearch (value) {
      console.log(value)
      this.getProductSearchKeyUp(value)
    },
    async getProductSearchKeyUp (query) {
      try {
        const restData = await this.$api.product.searchProduct({ search: query, page: 1, limit: 20, sort: '-_id' })
        console.log(restData)
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
