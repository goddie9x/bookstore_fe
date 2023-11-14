<template>
  <div class="flex flex-col w-full justify-center ">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Quản trị
      </nuxt-link>
      <span class="text-grey_dark/60 font-semibold text-lg">
        / Liên hệ
      </span>
    </div>
    <hr class="text-[#ccc] mt-2">
    <TableContact class="mt-4" />
  </div>
</template>

<script>
import TableContact from '@/components/admin/contact/TableContact.vue'
export default {
  components: {
    TableContact
  },
  layout: 'admin'
}
</script>
