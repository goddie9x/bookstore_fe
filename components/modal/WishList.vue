<template>
  <div :class="[ openModal ? 'fixed flex' : 'hidden', 'modal-checkout' ]">
    <div class="modal-background" @click="closeModal()" />
    <div class="modal-wrapper-checkout modal-animation-close">
      <div class="bg-white flex items-center justify-between  p-5">
        <p class="text-xl font-semibold">
          {{ modalTitle }}
        </p>
        <button class="delete bg-[#efefef] w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal()">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
      <div class="overflow-y-auto h-[85vh]">
        <section class="p-5 rounded-b-2xl">
          <div>
            <div v-for="item in wishList" :key="item._id" class="box">
              <div class="grid grid-cols-6">
                <div class="w-24 col-span-2">
                  <img :src="item.product.images[0]" alt="photo" class="w-24">
                </div>
                <div class="flex flex-col justify-center sm:pl-2 pl-3 font-semibold col-span-4">
                  <p class="font-semibold text-black">
                    {{ item.product.name }}
                  </p>
                  <p>${{ item.product.price }}  </p>
                </div>
              </div>
              <div class="flex justify-center items-center">
                <i class="fa-regular fa-trash-can text-red cursor-pointer text-lg ml-[2px]" @click="removeFromFavourite(item._id)" />
              </div>
            </div>
            <div v-if="wishList.length === 0">
              <p>{{ wishEmptyLabel }}</p>
            </div>
          </div>
        </section>
        <div class="m-4">
          <button v-show="wishList.length > 0" class="rounded-xl p-3 bg-black hover:opacity-80 text-white w-full" @click="onNextBtn">
            XEM DANH SÁCH YÊU THÍCH
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishLish',

  data () {
    return {
      modalTitle: 'Danh sách yêu thích',
      wishEmptyLabel: 'Danh sách yêu thích trống'
    }
  },

  computed: {
    wishList () {
      return this.$store.getters.wishlist
    },
    openModal () {
      if (this.$store.getters.isWishlistModalOpen) {
        return true
      } else {
        return false
      }
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  mounted () {

  },
  methods: {
    closeModal () {
      this.$store.commit('showWishlistModal', false)
    },
    onNextBtn () {
      this.$router.push('/wishlist')
      this.closeModal()
    },
    async removeFromFavourite (wishlistId) {
      try {
        await this.$api.wishlist.deleteWishlist({ wishlistId })
        this.$store.dispatch('dataWishlist')
        this.$toast.success('Product removed from wishlist successfully', { timeout: 1500 })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    @apply flex;
    @apply justify-between;
    @apply mb-3;
  }
</style>
