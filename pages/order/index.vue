<template>
  <div class="flex flex-col">
    <header class="banner_single mb-10">
      <div class="flex justify-center absolute items-center w-full flex-col">
        <h2 class="text-white text-3xl font-semibold">
          BOOKSTORE
        </h2>
        <span class="text-orange text-lg">
          <nuxt-link tag="span" class="text-white text-lg cursor-pointer" to="/">
            TRANG CHỦ
          </nuxt-link>
          / ĐẶT HÀNG
        </span>
      </div>
    </header>
    <tab-order />
  </div>
</template>

<script>
import TabOrder from '@/components/order/TabOrder.vue'

export default {
  components: {
    TabOrder
  },
  middleware: ['user']
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
</style>
