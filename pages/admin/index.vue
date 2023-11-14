<template>
  <Content />
</template>

<script>
import Content from '@/components/admin/Content.vue'
export default {
  components: {
    Content
  },
  layout: 'admin',
  middleware: ['auth']
}
</script>
