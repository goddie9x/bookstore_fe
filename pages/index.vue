<template>
  <div>
    <VmHero />
    <!-- <VmSubheader /> -->
    <!-- <VmProductsList /> -->
    <tab-product />
    <!-- <div class="fixed z-50 w-10 h-10 bg-red">
      Mess
    </div> -->
  </div>
</template>

<script>
// import VmProductsList from '@/components/products_list/ProductsListContainer'
import TabProduct from '@/components/tab/TabProduct.vue'
import VmHero from '@/components/hero/Hero'
// import VmSubheader from '@/components/subheader/Subheader'  timkiem

export default {
  name: 'Index',
  components: {
    TabProduct,
    // VmProductsList,
    VmHero
    // VmSubheader
  }
}
</script>
