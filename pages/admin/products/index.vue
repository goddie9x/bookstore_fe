<template>
  <div class="flex flex-col w-full justify-center ">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Quản trị
      </nuxt-link>
      <span class="text-grey_dark/60 font-semibold text-lg">
        / Sách
      </span>
    </div>
    <hr class="text-[#ccc] mt-2 pb-3">
    <div class="flex">
      <nuxt-link to="/admin/products/add" tag="button" class="bg-blue lg:w-28 lg:h-9 hover:opacity-90 focus:scale-110 text-white rounded-md hover:text-white focus:text-white">
        <i class="fa-solid fa-plus text-white" /> Thêm sách
      </nuxt-link>
    </div>
    <TableProduct class="mt-4" />
  </div>
</template>
<script>
import TableProduct from '@/components/admin/products/TableProduct'
export default {
  components: {
    TableProduct
  },
  layout: 'admin',
  middleware: ['auth']
}
</script>
