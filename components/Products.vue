<template>
  <div :class="[detail ? 'detail' : '']" class="rounded-2xl shadow-xl shadow-slate-300/60">
    <div class="img-wrapper rounded-t-2xl overflow-hidden relative thumb">
      <nuxt-link
        :to="{
          name: 'product_detail-id',
          params: {
            id: product._id,
            name: product.name,
            description:product.description,
            rating: product.rating,
            category:product.category,
            images:product.images,
            numberInStock:product.numberInStock,
            price: product.price,
            originalPrice:product.originalPrice,
            sold:product.sold,
            view:product.view,
          }
        }"
      >
        <div class="overflow-hidden relative">
          <img width="280" height="400" class="rounded-t-2xl img_show1" :src="product.images[0]" alt="Placeholder image">
          <img width="280" height="400" class="rounded-t-2xl img_show2 absolute top-0 opacity-0" :src="product.images[1]" alt="Placeholder image">
        </div>
      </nuxt-link>
      <div class="top-0 absolute left-0 bg-[#00D100] m-4 rounded-sm  text-white">
        <p class="px-1 py-[2px] font-medium">
          Đã bán: {{ product.sold }}
        </p>
      </div>
      <div class="m-4 icon_product top-0" :title="addToFavouriteLabel" @click="saveToFavorite(product._id)">
        <span class="icon">
          <i class="far fa-heart" />
        </span>
      </div>
      <div class=" icon_product  mx-4 top-16 my-1 item_hover" :title="quickView" @click="showQuickView">
        <i class="fa-solid fa-expand" />
      </div>
      <div class=" icon_product  mx-4 top-28 my-2 item_hover" :title="`{product.view} views` ">
        <i class="far fa-eye" />
      </div>
      <div class="absolute w-full bottom-20 flex justify-center item_hover">
        <button class="rounded-md py-3 px-2 w-2/3 bg-white  hover:text-[#ff7004] transition-all text-black font-bold" @click="addToCart(product._id)">
          {{ addToCartLabel }}
        </button>
      </div>
      <div class="flex justify-center p-2 cursor-pointer">
        <nuxt-link
          class="text-[1rem] w-full font-normal"
          :to="{
            name: 'product_detail-id',
            params: {
              id: product._id,
              name: product.name,
              description:product.description,
              rating: product.rating,
              category:product.category,
              numberInStock:product.numberInStock,
              images:product.images,
              price: product.price,
              originalPrice:product.originalPrice,
              sold:product.sold,
              view:product.view,
              reviews: product.reviews,
            }
          }"
        >
          <div class="text-black flex justify-center font-semibold hover:text-[#ff7004] transition-all ease-in delay-150 ">
            <p>
              {{ product.name }}
            </p>
          </div>
          <div class="flex justify-center font-semibold text-black items-center">
            <p>
              {{ product.price }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="text-wrapper  cursor-pointer" />
    <quick-view ref="quickModal" :product="product" />
  </div>
</template>

<script>
import QuickView from '@/components/modal/QuickView.vue'
export default {
  name: 'Products',
  components: {
    QuickView
  },
  props: ['product', 'detail'],
  data () {
    return {
      addToCartLabel: 'Thêm vào giỏ hàng',
      viewDetailsLabel: 'Chi tiết',
      removeFromCartLabel: 'Xóa khỏi giỏ hàng',
      addToFavouriteLabel: 'Thêm vào danh sách yêu thích',
      removeFromFavouriteLabel: 'Xóa khỏi danh sách yêu thích',
      selected: 1,
      quickView: 'Xem nhanh',
      listCarts: []
      // quantityArray: []
    }
  },

  computed: {
    isUserLogged () {
      return this.$store.getters.isUserLoggedIn
    }
  },

  mounted () {
    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity
    }
    // this.getListCart()
  },

  methods: {
    showQuickView () {
      this.$refs.quickModal.showModal()
    },
    async addToCart (productId) {
      if (this.isUserLogged) {
        try {
          const token = localStorage.getItem('token')
          const userData = await this.$api.auth.secret(token)
          // const dataCart = await this.$api.cart.getCarts(userData.data._id)
          const cart = {
            user: userData.data._id,
            product: productId,
            quantity: 1
          }
          await this.$api.cart.addToCart(cart)
          this.$toast.success('Add cart successfully', { timeout: 1500 })
          this.$store.dispatch('dataCart')
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },

    async saveToFavorite (id) {
      if (this.isUserLogged) {
        try {
          const token = localStorage.getItem('token')
          const userData = await this.$api.auth.secret(token)
          const wishlist = {
            userId: userData.data._id,
            productId: id
          }
          await this.$api.wishlist.addWishList(wishlist)
          this.$toast.success('Thêm vào danh sách yêu thích thành công', { timeout: 1500 })
          this.$store.dispatch('dataWishlist')
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$store.commit('showLoginModal', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail {
    @apply flex;
    @apply flex-col;
    @apply lg:flex-row;
    @apply m-5;
    @apply shadow-2xl;

    .img-wrapper {
      flex: 1;

      img {
        @apply lg:rounded-none;
        @apply lg:rounded-tl-2xl;
        @apply lg:rounded-bl-2xl;
      }
    }

    .text-wrapper {
      flex: 2;
    }

  }
   .icon_product{
      @apply  text-lg absolute  w-10 h-10 bg-white rounded-full cursor-pointer flex justify-center items-center right-0;
    }
    .icon_product:hover{
      @apply bg-[#ff7004] text-white transition-all
    }
    .item_hover{
      display: none;
    }
    .thumb:hover{
        .item_hover{
          @apply animate-[slideBottom_0.4s_ease-out] flex;
        }
        .img_show2{
            opacity: 1;
            transform: scale(1.1) rotate(3deg);
            transition: all 0.5s ease-in-out;
        }
        .img_show1{
          opacity: 0;
            transform: scale(1.1) rotate(3deg);

          transition: all 0.5s ease-in-out;

        }

    }
    .img_show1{
      opacity: 1;
     transition: all .3s ease 0s;

    }
      .img_show2{
            opacity: 0;
            // transform: scale(0.9);
            transition: all .3s ease 0s;
        }
</style>
