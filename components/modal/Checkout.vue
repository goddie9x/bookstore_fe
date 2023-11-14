<template>
  <div :class="[ openModal ? 'fixed flex' : 'hidden', 'modal-checkout' ]">
    <div class="modal-background" @click="closeModal(false)" />
    <div class="modal-wrapper-checkout modal-animation-close">
      <div class="bg-white flex items-center justify-between  p-5">
        <p class="text-xl font-semibold">
          {{ modalTitle }}
        </p>
        <button class="delete bg-[#efefef] w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal(false)">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
      <div class="overflow-y-auto h-[85vh]">
        <section class="p-5 rounded-b-2xl">
          <div>
            <div v-for="(item,index) in carts" :key="index" class="box">
              <div class="grid grid-cols-6">
                <div class="w-24 col-span-2">
                  <img :src="item.product.images[0]" alt="photo">
                </div>
                <div class="flex flex-col justify-center sm:pl-2 pl-3 text-black col-span-4">
                  <p class="font-semibold">
                    {{ item.product.name }}
                  </p>
                  <p>{{ item.quantity > 0 ? `${item.quantity}` : '' }} x ${{ item.product.price }}</p>
                  <p>{{ item.size }}</p>
                </div>
              </div>
              <div class="flex justify-center items-center">
                <i class="fa-regular fa-trash-can text-red cursor-pointer text-lg" @click="removeFromCart(item._id)" />
              </div>
            </div>
            <div v-if="carts.length === 0">
              <p>{{ cartEmptyLabel }}</p>
            </div>
          </div>
        </section>
        <div class="mx-4 space-y-4 mb-8">
          <div v-show="carts.length > 0" class="text-black flex justify-between">
            <p class="text-black font-semibold text-lg">
              Tổng :
            </p>
            <p class="text-black text-[1rem]">
              {{ totalSub }} VND
            </p>
          </div>
          <button v-show="carts.length > 0" class="rounded-xl p-3 bg-black hover:opacity-80 text-white w-full" @click="onNextBtn">
            XEM GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',

  data () {
    return {
      modalTitle: 'GIỎ HÀNG',
      removeLabel: 'Xóa khỏi giỏ hàng',
      cartEmptyLabel: 'Giỏ hàng của bạn trống'
    }
  },

  computed: {
    carts () {
      return this.$store.getters.carts
    },
    openModal () {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true
      } else {
        return false
      }
    },
    totalSub () {
      return this.carts.reduce((accumulator, item) => {
        return accumulator + item.quantity * item.product.price
      }, 0)
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },

  methods: {
    async removeFromCart (cartId) {
      try {
        // const token = localStorage.getItem('token')
        // const userData = await this.$api.auth.secret(token)
        // const cart = {
        //   user: userData.data._id,
        //   product: productId,
        //   size
        // }
        // console.log(cart)
        await this.$api.cart.deleteCartItem({ cartId })
        this.$store.dispatch('dataCart')
        this.$toast.success('Xóa sách khỏi giỏ hàng thành công', { timeout: 1500 })
      } catch (error) {
        console.log(error)
      }
    },
    closeModal (reloadPage) {
      this.$store.commit('showCheckoutModal', false)

      if (reloadPage) {
        window.location.reload()
      }
    },

    onNextBtn () {
      this.$store.commit('showCheckoutModal', false)
      this.$router.push('/cart')
    },
    onPrevBtn () {
      this.isCheckoutSection = false
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
