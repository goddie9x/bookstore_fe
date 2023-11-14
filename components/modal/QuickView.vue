<template>
  <div>
    <a-modal
      v-model="visible"
      :title="null"
      :footer="null"
      class="w-full"
      width="1000px"
      @ok="handleOk"
    >
      <div class="flex w-full h-2/3 sm:flex-row flex-col justify-center">
        <div class="quick_car mt-1">
          <Carousel :img="product.images" class="cursor-move" style="height: 500px; width: 500px;" />
        </div>
        <div class="flex flex-col space-y-2 px-1/3 ml-3">
          <h2 class="sm:text-2xl text-xl font-semibold text-black">
            {{ product.name }}
          </h2>
          <div class="text-black font-medium text-[1rem]">
            <a-rate v-model="rating" disabled allow-half />  (Đánh giá {{ product.rating }}/5)
          </div>
          <h2 class="text-lg text-black font-semibold">
            ${{ product.price }} <span class="text-orange line-through ml-2">${{ product.price*1.2 }}</span>
          </h2>
          <p class="text-[1rem] font-normal text-black">
            {{ product.description }}
          </p>
          <h2 class="text-lg text-black font-semibold">
            Số lượng kho:
          </h2>
          <div>
            <a-radio-group v-model="value" class="space-x-2" @change="onChangeRadio">
              <a-radio-button v-for="(item,index) in product.sizes" :key="index" :value="item.name">
                {{ item.name }}
              </a-radio-button>
            </a-radio-group>
            <h2 class="text-lg text-black font-semibold">
            Số lượng:
            </h2>
            <p v-if="value!=''" class="pt-2 text-black">
              {{ number }} products available
            </p>
          </div>
          <div class="flex justify-between">
            <a-input-number v-model="valueNumber" :min="1" :max="number > 0? number : 1" @change="onChange" />
            <button class="sm:py-[10px] sm:px-2 py-1 w-1/3 bg-black  hover:opacity-90 transition-all text-white font-semibold" @click="addToCart">
              Thêm vào giỏ hàng
            </button>
          </div>
          <div>
            <h2 class="text-lg text-black font-semibold">
              Chia sẻ
            </h2>
          </div>
          <div class="flex space-x-2">
            <div class=" icon_quickview">
              <i class="fab fa-facebook-f" />
            </div>
            <div class="icon_quickview">
              <i class="fab fa-google-plus-g" />
            </div>
            <div class="icon_quickview">
              <i class="fab fa-instagram" />
            </div>
            <div class="icon_quickview">
              <i class="fab fa-twitter" />
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import Carousel from '@/components/carousel/Carousel.vue'

export default {
  components: {
    Carousel
  },
  props: ['product'],
  data () {
    return {
      rating: this.product.rating,
      visible: false,
      value: '',
      number: 0,
      valueNumber: 1
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  methods: {
    async addToCart () {
      if (!this.value) {
        this.$toast.warning('Please choose size', { timeout: 1500 })
      } else if (this.isUserLoggedIn) {
        try {
          const token = localStorage.getItem('token')
          const userData = await this.$api.auth.secret(token)
          const cart = {
            user: userData.data._id,
            product: this.product._id,
            quantity: this.valueNumber,
            size: this.value
          }
          await this.$api.cart.addToCart(cart)
          this.$store.dispatch('dataCart')
          console.log(cart)
          this.$toast.success('Thêm giỏ hàng thành công', { timeout: 1500 })
        } catch (error) {
          console.log('error')
        }
      } else {
        this.visible = false
        this.$store.commit('showLoginModal', true)
      }
    },
    onChangeRadio (e) {
      console.log(`checked = ${e.target.value}`)
      console.log(this.product)
      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'L') {
        const sizes = [...this.product.sizes]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'L') {
            this.number = size.numberInStock
          }
        })
      }

      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'M') {
        const sizes = [...this.product.sizes]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'M') {
            this.number = size.numberInStock
          }
        })
      }
      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'S') {
        const sizes = [...this.product.sizes]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'S') {
            this.number = size.numberInStock
          }
        })
      }
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    onChange (value) {
      console.log('changed', value)
      console.log('valueNumber', this.valueNumber)
    }
  }
}
</script>

<style lang="scss">
.ant-modal{
    @apply h-auto w-1/3;
}
.ant-input-number {
  margin-right: 0px;
}
.icon_quickview{
    @apply bg-white border rounded-full text-black w-7 h-7 flex justify-center items-center transition-all ease-in-out;
}
.icon_quickview:hover{
    @apply text-orange border-orange cursor-pointer;
}
.quick_car{
  .ant-carousel{
    @apply lg:w-80 sm:w-64
  }
}
</style>
