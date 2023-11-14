<template>
  <ul class="md:pl-6">
    <sidenav-item title="Thống Kê" to="/admin">
      <documentation-icon />
    </sidenav-item>
    <sidenav-item title="Tài Khoản" to="/admin/users">
      <users-icon />
    </sidenav-item>

    <sidenav-item title="Sản Phẩm" to="/admin/products">
      <medias-icon />
    </sidenav-item>

    <sidenav-item title="Đơn Hàng" to="/admin/orders">
      <servers-icon />
    </sidenav-item>

    <sidenav-item title="Liên Lạc" to="/admin/contact">
      <contact-icon />
    </sidenav-item>

    <!-- <sidenav-item title="Settings" to="/admin/settings">
      <settings-icon />
    </sidenav-item> -->

    <!-- <sidenav-item title="Terminal" to="/admin/terminal">
      <terminal-icon />
    </sidenav-item> -->

    <sidenav-item title="Đã Xóa" to="/admin/recyclebin">
      <recycle-bin-icon />
    </sidenav-item>
  </ul>
</template>

<script>
import SidenavItem from './Item.vue'

/* ICONS */
import UsersIcon from './icons/Users.vue'
import MediasIcon from './icons/Medias.vue'
import ContactIcon from './icons/Contact.vue'
import ServersIcon from './icons/Servers.vue'
// import TerminalIcon from './icons/Terminal.vue'
// import SettingsIcon from './icons/Settings.vue'
import RecycleBinIcon from './icons/RecycleBin.vue'
import DocumentationIcon from './icons/Documentation.vue'

export default {
  name: 'SidenavItems',
  components: {
    UsersIcon,
    MediasIcon,
    SidenavItem,
    ContactIcon,
    ServersIcon,
    // TerminalIcon,
    // SettingsIcon,
    RecycleBinIcon,
    DocumentationIcon
  }
}
</script>
