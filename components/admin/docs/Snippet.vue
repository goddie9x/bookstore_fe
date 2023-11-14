<template>
  <pre
    class="
      font-mono
      text-sm
      px-4
      py-1
      rounded
      overflow-x-auto
      max-w-full
      bg-[#F3F4F6]
      text-[#2563EB]
      border
    "
  >
    {{ snippets }}
  </pre>
</template>

<script>
export default {
  name: 'Snippet',
  data () {
    return {
      snippets: `<sidenav-item title="Users" to="/">
      <users-icon />
    </sidenav-item>

    <sidenav-item title="Medias" to="/admin/medias">
      <medias-icon />
    </sidenav-item>`
    }
  }
}
</script>
