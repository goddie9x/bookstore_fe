<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <a class="ant-dropdown-link " @click="e => e.preventDefault()">
      <!-- <i class="cursor-pointer hover:text-orange transition-all fa-solid fa-circle-user lg:text-[1.4rem] text-lg leading-7 text-black" /> -->
      <img v-if="!avatar" src="@/static/default.png" alt="photo" class="w-[32px] rounded-full cursor-pointer pl-[2px]">
      <img v-else :src="avatar" alt="photo" class="w-[32px] rounded-full cursor-pointer pl-[2px]">
      <!-- <i class="fa-solid hover:text-orange transition-all fa-caret-down absolute mt-2 ml-1 cursor-pointer text-black" /> -->
    </a>
    <a-menu slot="overlay">
      <a-menu-item key="0">
        <a href="/account" class=" font-medium pr-1">
          <i class="cursor-pointer fa-solid fa-circle-user text-[1rem] text-black mx-1" />
          {{ userName }} </a>
      </a-menu-item>
      <a-menu-item key="1">
        <a href="/order" class=" font-medium pr-1">
          <i class="cursor-pointer fa-solid fa-cart-shopping text-[1rem] text-black mx-1" />
          View order </a>
      </a-menu-item>
      <a-menu-item v-if="isAdmin" key="2">
        <a href="/admin" class=" font-medium pr-1">
          <i class="fas fa-cog text-[1rem] text-black mx-1 cursor-pointer" />
          System </a>
      </a-menu-item>
      <a-menu-item key="3">
        <a href="#" class=" font-medium pr-1">
          <i class="cursor-pointer fa-solid fa-chart-line text-[1rem] text-black mx-1" />
          See details </a>
      </a-menu-item>
      <a-menu-item key="4">
        <a href="" class=" font-medium pr-1" @click="logout">
          <!-- <i class="fa-solid fa-right-from-bracket"></i> -->
          <i class="cursor-pointer fa-solid fa-right-from-bracket text-[1rem] text-black mx-1" />
          Đăng xuất </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  computed: {
    userName () {
      return this.$store.getters.getUserName
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    avatar () {
      // console.log('avatar:', this.$store.getters.avatar)
      return this.$store.getters.avatar
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('info')
      this.$store.commit('isUserLoggedIn', false)
      this.$store.commit('isUserSignedUp', false)
      this.$store.commit('removeProductsFromFavourite')
    }
  }

}
</script>

<style lang="scss">
.ant-dropdown-menu-item:hover{
    @apply bg-[#d8dbe0]
}

.ant-dropdown{
    @apply fixed
}

.ant-dropdown-menu{
    @apply border-[#d8dbe0]
}
.ant-dropdown-menu-item{
    @apply px-5
}
</style>
