<template>
  <div>
    <a-radio-group v-model="value" class="space-x-2" @change="onChange">
      <a-radio-button value="L">
        L
      </a-radio-button>
      <a-radio-button value="M">
        M
      </a-radio-button>
      <a-radio-button value="S">
        S
      </a-radio-button>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 'a'
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.value}`)
    }
  }
}
</script>

<style lang="scss">
      .ant-radio-button-wrapper{
        @apply px-5
      }
    .ant-radio-button-wrapper:last-child{
        @apply rounded-none;
    }
    .ant-radio-button-wrapper:first-child{
        @apply rounded-none;
    }
</style>
