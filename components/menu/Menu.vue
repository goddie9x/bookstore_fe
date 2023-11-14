<template>
  <a-menu
    class="sm:font-bold lg:w-10/12 lg:text-[0.9rem] lg:bg-base lg:px-0 lg:space-x-16 hidden sm:block lg:text-black  sm:px-12 sm:bg-base"
    mode="horizontal"
    :default-selected-keys="['1']"
    :style="{ lineHeight: '80px' }"
  >
    <a-menu-item class="p-0" key="1">
      <nuxt-link to="/" tag="li">
        TRANG CHỦ
      </nuxt-link>
    </a-menu-item>
    <a-menu-item key="2" class="relative sub_shop">
      SÁCH GIÁO KHOA<a-icon type="down" class="absolute leading-[75px] font-medium pl-[1px]" />
      <ul class="hidden absolute bg-[#f83c91] item-menu_shop">
        <li @click="searchSubject(5)">
          Cấp 1(Tiểu Học)
        </li>
        <li @click="searchSubject(6)">
          Cấp 2(TH Cơ Sở)
        </li>
        <li @click="searchSubject(7)">
          Cấp 3(TH Phổ Thông)
        </li>
      </ul>
    </a-menu-item>
    <a-menu-item key="3" class="relative sub_shop">
      VĂN HỌC - LỊCH SỬ<a-icon type="down" class="absolute leading-[78px] font-medium pl-[1px]" />
      <ul class="hidden absolute bg-[#fef5ef] item-menu_shop">
        <li @click="searchSubject(1)">
          Văn Học Việt Nam
        </li>
        <li @click="searchSubject(2)">
          Văn Học Thế Giới
        </li>
        <li @click="searchSubject(0)">
          Lịch Sử Việt Nam
        </li>
        <li @click="searchSubject(3)">
          Lịch Sử Thế Giới
        </li>
      </ul>
    </a-menu-item>
    <a-menu-item key="4" class="relative sub_shop">
      TRUYỆN TRANH - TIỂU THUYẾT<a-icon type="down" class="absolute leading-[78px] font-medium pl-[1px]" />
      <ul class="hidden absolute bg-[#fef5ef] item-menu_shop">
        <nuxt-link to="/cart" tag="li">
          Trinh Thám
        </nuxt-link>
        <nuxt-link to="/wishlist" tag="li">
          Khoa Học Viễn Tưởng
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Ngôn Tình
        </nuxt-link>
        <nuxt-link to="/wishlist" tag="li">
          Cổ Tích
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Kinh Dị
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Hài
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Ngụ Ngôn
        </nuxt-link>
      </ul>
    </a-menu-item>
    <a-menu-item key="5" class="relative sub_shop">
      KHÁC<a-icon type="down" class="absolute leading-[78px] font-medium pl-[1px]" />
      <ul class="hidden absolute bg-[#fef5ef] item-menu_shop">
        <nuxt-link to="/cart" tag="li">
          Thiếu Nhi
        </nuxt-link>
        <nuxt-link to="/wishlist" tag="li">
          Anime
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Sách Tâm Lý
        </nuxt-link>
        <nuxt-link to="/wishlist" tag="li">
          Sách Tham KHảo
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Bách Khoa Toàn Thư
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Từ Điển
        </nuxt-link>
        <nuxt-link to="/cart" tag="li">
          Tự Truyện
        </nuxt-link>
      </ul>
    </a-menu-item>
  </a-menu>
</template>
<script>
export default {
  methods: {
    searchSubject (value) {
      this.$router.replace({ path: '/search', query: { keyword: '', subject: value } })
    }
  }
}
</script>

<style lang="scss" scoped>
.relative.sub_shop.ant-menu-item{
  margin-left: 0;
  margin-right: 4px;
}
.ant-menu-horizontal{
    border-bottom:none ;
}
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-item-selected{
    color: #f83c91;
}
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
    border-bottom: none;
}

.sub_shop:hover{
    .item-menu_shop{
      @apply  animate-[flipInMenu_.5s_ease-in] block;
    }
}
.item-menu_shop{
  @apply leading-none mt-[-1px] w-44 bg-[#ffffff] ;
  li{
    @apply w-full px-8 py-4 text-black hover:text-[#f83c91] transition-all ease-out duration-300;

  }
}
</style>
