<template>
  <li>
    <router-link :to="to">
      <span
        class="
          flex
          items-center
          justify-start
          my-2
          p-4
          text-sm
          w-full
          hover:text-white
        "
        :class="$route.path === to ? 'font-medium text-white' : 'text-[#9CA3AF]'"
      >
        <span>
          <slot />
        </span>
        <span class="mx-4">
          {{ title }}
        </span>
      </span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SidenavItem',
  props: {
    to: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
