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
          / SẢN PHẨM
        </span>
      </div>
    </header>
    <!-- <Product :detail="true" :product="product" /> -->
    <div class="px-8 flex sm:flex-row flex-col  gap-6 lg:my-10 my-5">
      <div class="img_detail mx-auto">
        <Carousel :img="product.images" class="cursor-move" />
      </div>
      <div class="flex flex-col space-y-5 pl-4">
        <h2 class="text-black font-medium text-2xl">
          {{ product.name }} <span class="text-black text-[1rem]"><i class="far fa-eye ml-2" /> {{ product.view }} Lượt
            xem</span>
        </h2>
        <p class="text-black font-medium text-[1rem]">
          <a-rate v-model="rating" disabled allow-half /> (Đánh Giá {{ product.rating }}/5)
        </p>
        <p class="text-black font-medium text-2xl">
          ${{ product.price }} <span class="text-orange line-through ml-2">${{ product.price * 1.2 }}</span>
        </p>
        <p class="des_detail  text-[1rem] font-normal">
          {{ product.description }}
        </p>
        <div class="flex flex-col">
          <p class="text-black font-medium text-[1rem] mb-2">
            Kho: {{ product.numberInStock }}
          </p>
          <div>
            <a-radio-group v-model="value" class="space-x-2" @change="onChangeRadio">
              <a-radio-button v-for="(item, index) in product.size" :key="index" :value="item.name">
                {{ item.name }}
              </a-radio-button>
              <!-- <a-radio-button value="M">
                M
              </a-radio-button>
              <a-radio-button value="S">
                S
              </a-radio-button> -->
            </a-radio-group>
            <!-- <p v-if="value!=''" class="pt-2 text-black">
              {{ number }} products available
            </p> -->
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-black font-medium text-[1rem] mb-2">
            Số lượng
          </p>
          <a-input-number v-model="valueNumber" :min="1" :max="number > 0 ? number : 1" @change="onChange" />
        </div>
        <div class="flex cursor-pointer" @click="saveToFavorite(product._id)">
          <i class="fa-regular hover_item fa-heart lg:text-xl text-lg text-black transition-all hover:text-orange" />
          <p class="text-black font-medium text-[1rem] ml-2">
            Thêm vào danh sách yêu thích
          </p>
        </div>
        <button class="bg-black text-white font-medium w-36 py-[10px] px-2 transition-all hover:opacity-80"
          @click="addToCart">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
    <div class="my-10 px-12">
      <h2 class="text-black text-3xl font-semibold">
        GỢI Ý THÊM(Sản phẩm liên quan)
      </h2>
      <ProductsList :products="product.relatedProducts" />
    </div>
    <Comment class="my-10 px-12" />
  </div>
</template>

<script>
// import Product from '@/components/Products.vue'
import Carousel from '@/components/carousel/Carousel.vue'
import Comment from '@/components/comment/Comment.vue'
import ProductsList from '@/components/products_list/ProductsListContainer.vue'

// import RadioSize from '@/components/radio/Radio.vue'
export default {
  name: 'ProductDetailId',

  components: {
    // Product
    Carousel, Comment, ProductsList
  },
  data () {
    return {
      product: {},
      selected: 1,
      quantityArray: [],
      value: '',
      number: 0,
      valueNumber: 1,
      rating: 0
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  mounted () {
    this.productId()
  },

  methods: {
    async addToCart () {
      if (!this.value) {
        this.$toast.error('Please choose size', { timeout: 1500 })
      } else if (this.isUserLoggedIn) {
        try {
          const token = localStorage.getItem('token')
          const userData = await this.$api.auth.secret(token)
          const cart = {
            user: userData.data._id,
            product: this.$route.params.id,
            quantity: this.valueNumber,
            size: this.value
          }
          await this.$api.cart.addToCart(cart)
          this.$store.dispatch('dataCart')
          console.log(cart)
          // this.openNotificationWithIcon('success', 'Add cart successfully')
          this.$toast.success('Add cart successfully', { timeout: 1500 })
        } catch (error) {
          console.log('error')
        }
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    onChangeRadio (e) {
      console.log(`checked = ${e.target.value}`)
      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'L') {
        const sizes = [...this.product.size]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'L') {
            this.number = size.numberInStock
          }
        })
      }

      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'M') {
        const sizes = [...this.product.size]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'M') {
            this.number = size.numberInStock
          }
        })
      }
      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'S') {
        const sizes = [...this.product.size]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'S') {
            this.number = size.numberInStock
          }
        })
      }
    },
    onChange (value) {
      console.log('changed', value)
      console.log('valueNumber', this.valueNumber)
    },
    async productId () {
      const restData = await this.$api.product.getProductId(this.$route.params.id)
      console.log(restData.data.result)
      this.product = { ...restData.data.result }
      this.rating = this.roundHalf(this.product.rating)
      // this.product.rating = this.roundHalf(this.product.rating)
      // console.log(this.product.images)
    },
    async saveToFavorite (id) {
      if (this.isUserLoggedIn) {
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
    },
    roundHalf (num) {
      return Math.round(num * 2) / 2
    }
  }
}
</script>

<style lang="scss">
.banner_single {
  @apply lg:py-48 pt-14 pb-32 lg:bg-[top_left] bg-[center];
  background-image: url(@/static/banner/banner_single.png);
  //padding-top: 150px;
  padding-bot: 10px;
  display: flex;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

.ant-input-number {
  margin-right: 10px;
}

.ant-radio-button-wrapper {
  @apply px-5
}

.ant-radio-button-wrapper:last-child {
  @apply rounded-none;
}

.ant-radio-button-wrapper:first-child {
  @apply rounded-none;
}
</style>
