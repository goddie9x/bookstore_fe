<template>
  <div class="flex flex-col">
    <header class="banner_single mb-10">
      <div class="flex justify-center absolute items-center w-full flex-col">
        <h2 class="text-white text-3xl font-semibold">
          TÀI KHOẢN CỦA TÔI
        </h2>
        <span class="text-orange text-lg">
          <nuxt-link tag="span" class="text-white text-lg cursor-pointer" to="/">
            TRANG CHỦ
          </nuxt-link>
          / TÀI KHOẢN
        </span>
      </div>
    </header>
    <div class="mb-10 px-14 flex  flex-col">
      <TabAccount class="my-12" />
    </div>
  </div>
</template>

<script>
import TabAccount from '@/components/account/TabAccount.vue'
export default {
  components: {
    TabAccount
  },
  middleware: ['user']

}
</script>

<style lang="scss">
    .banner_single{
      background-image: url('@/static/banner/nen.jpg');
      position: relative;
      background-repeat: no-repeat;
      background-size: cover cover;
      padding: 100px 0 140px 0;
      width: 100%;
    }
</style>
