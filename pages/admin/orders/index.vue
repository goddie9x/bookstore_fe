<template>
  <div class="flex flex-col w-full justify-center ">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Quản trị
      </nuxt-link>
      <span class="text-grey_dark/60 font-semibold text-lg">
        / Đơn hàng
      </span>
    </div>
    <hr class="text-[#ccc] mt-2">
    <div class="flex justify-center">
      <TabOrder class="w-full flex justify-center" />
    </div>
    <!-- <item-order class="mt-10" /> -->
  </div>
</template>

<script>
import TabOrder from '../../../components/admin/orders/TabOrder.vue'
// import ItemOrder from '@/components/admin/orders/TableOrder.vue'
export default {
  components: {
    // ItemOrder
    TabOrder
  },
  layout: 'admin'
}
</script>
