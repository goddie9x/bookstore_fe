<template>
  <input
    v-model="value"
    class="input"
    type="search"
    :placeholder="placeholder"
    @keyup="search(value)"
  >
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      value: ''
    }
  },

  computed: {
    placeholder () {
      if (this.$route.path === '/wishlist') {
        return 'Search in wishlist...'
      } else {
        return 'Search...'
      }
    }
  },

  methods: {
    search (value) {
      if (value.length > 0) {
        this.$store.commit('setHasUserSearched', true)
        this.$store.commit('setProductTitleSearched', value)
      } else {
        this.$store.commit('setHasUserSearched', false)
        this.$store.commit('setProductTitleSearched', '')
      }
    }
  }
}
</script>
