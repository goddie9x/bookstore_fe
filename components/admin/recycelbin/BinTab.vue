
<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " :class="{'text-[#db2777] hover:text-[#db2777] bg-white': openTab !== 1, 'text-white hover:text-white bg-[#db2777]': openTab === 1}" @click="toggleTabs(1)">
            Người dùng đã xóa
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-[#db2777]  hover:text-[#db2777] bg-white': openTab !== 2, 'text-white  hover:text-white bg-[#db2777]': openTab === 2}" @click="toggleTabs(2)">
            Sản phẩm đã xóa
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <BinUser />
            </div>
            <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <BinProduct />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BinUser from '@/components/admin/recycelbin/BinUser.vue'
import BinProduct from '@/components/admin/recycelbin/BinProduct.vue'
export default {
  components: {
    BinUser,
    BinProduct

  },
  data () {
    return {
      openTab: 1,
      current: 1
    }
  },
  methods: {
    toggleTabs (tabNumber) {
      this.openTab = tabNumber
    },
    callback (key) {
      console.log(key)
    }
  }
}
</script>
  <style lang="scss">
  // .leading-normal{
  //     @apply hover:text-orange
  // }
  </style>
