<template>
  <div class="flex flex-col">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Quản trị
      </nuxt-link>
      <span class="text-grey_dark/60 font-semibold text-lg">
        / Đã xóa
      </span>
    </div>
    <hr class="text-[#ccc] mt-2 pb-3">
    <BinTab class="mt-4" />
  </div>
</template>
<script>
import BinTab from '@/components/admin/recycelbin/BinTab.vue'
export default {
  components: {
    BinTab
  },
  layout: 'admin',
  middleware: ['auth']
}
</script>
