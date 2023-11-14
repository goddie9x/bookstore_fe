<template>
  <nav
    ref="menu"
    class="flex justify-between sticky  top-0 bg-base z-10 shadow-md lg:px-10 px-4 max-w-[100%]"
    role="navigation"
    aria-label="main navigation"
  >
    <nuxt-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class=" title lg:w-60 h-20 w-36 " />
    </nuxt-link>
    <Menu />
    <div class="flex items-center">
      <div class="mr-7 cursor-pointer" @click="showWishlistModal">
        <!-- <nuxt-link :to="{ name: 'user-wishlist' }" tag="span" class="icon">
        </nuxt-link> -->
        <span class="item_count absolute border-2">{{ wishList.length }}</span>
        <i class="fa-regular hover_item fa-heart lg:text-xl text-lg text-black" />
      </div>
      <div class="mr-7">
        <div class="cursor-pointer" @click="showCheckoutModal">
          <span class="icon">
            <!-- :class="[numProductsAdded > 0 ? 'p-2 bg-blue text-white rounded-md' : '']" -->
            <span class="item_count absolute border-2">{{ carts.length }}</span>
            <i class="fa fa-shopping-cart lg:text-xl text-lg text-black hover_item " />
          </span>
        </div>
      </div>
      <div class="mr-7" @click="showSearchModal">
        <i class="fa-solid hover_item fa-magnifying-glass lg:text-xl text-lg cursor-pointer text-black" />
      </div>
      <div class="lg:mr-6 mr-7 sm:block hidden">
        <span class="icon">
          <!-- <i class="fa fa-user text-lg" /> -->
          <i v-if="!isUserLoggedIn" class="fa-solid fa-right-to-bracket lg:text-xl text-lg text-black hover_item cursor-pointer" @click="showLoginModal" />
          <!-- <a-icon type="login" /> -->
        </span>
        <span class="flex justify-center items-center mr-1">
          <drop-profile v-if="isUserLoggedIn" class="absolute" />
        </span>
      </div>
      <div class="mr-3 block sm:hidden">
        <i class="fa-solid fa-bars text-lg text-black" />
      </div>
    </div>
  </nav>
</template>

<script>
import Menu from '../menu/Menu.vue'
import DropProfile from '../subheader/DropProfile.vue'
export default {
  name: 'VmHeader',
  components: {
    Menu,
    DropProfile

  },
  data () {
    return {
      isCheckoutActive: false,
      showDropdown: false,
      logoutLabel: 'Log out',
      loginLabel: 'Log in',
      signupLabel: 'Sign up',
      wishlistLabel: 'Wishlist'
    }
  },

  computed: {
    carts () {
      return this.$store.getters.carts
    },
    wishList () {
      return this.$store.getters.wishlist
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    getUserName () {
      const name = this.$store.getters.getUserName

      if (name === '') {
        return 'user'
      } else {
        return name
      }
    }
  },
  async created () {
    if (localStorage.getItem('token')) {
      try {
        const token = localStorage.getItem('token')
        // const authen = `Bearer ${token}`
        // console.log(authen)
        const userData = await this.$api.auth.secret(token)
        const resData = JSON.parse(localStorage.getItem('info'))
        if (resData.admin) {
          this.$store.commit('isAdmin', resData.admin)
        }

        this.$store.commit('setUserName', userData.data.username)
        this.$store.commit('avatar', resData.avatar)
        this.$store.commit('isUserLoggedIn', true)
        this.$store.dispatch('dataCart')
        this.$store.dispatch('dataWishlist')
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-sequences, no-unused-expressions
    window.addEventListener('blur', this.closeDropdown, true),
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('blur', this.closeDropdown)
  },

  methods: {
    handleScroll () {
      if (window.scrollY > 100) {
        this.$refs.menu.classList.add('fixeds')
      } else {
        this.$refs.menu.classList.remove('fixeds')
      }
    },
    showCheckoutModal () {
      if (this.isUserLoggedIn) {
        this.$store.commit('showCheckoutModal', true)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    showWishlistModal () {
      if (this.isUserLoggedIn) {
        this.$store.commit('showWishlistModal', true)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    showLoginModal () {
      this.$store.commit('showLoginModal', true)
    },
    showSignupModal () {
      this.$store.commit('showSignupModal', true)
    },
    showSearchModal () {
      console.log('show search')
      this.$store.commit('showSearchModal', true)
    },
    logout () {
      this.$store.commit('isUserLoggedIn', false)
      this.$store.commit('isUserSignedUp', false)
      this.$store.commit('removeProductsFromFavourite')

      // redirect to homepage
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss" scoped>
 .fixeds {
    @apply animate-[fadeInOut_0.5s_ease-out]

}
.hover_item{
  @apply hover:text-[#f79837] hover:transition-all hover:duration-300 hover:ease-in-out
}
.item_count{
  width: 20px;
    height: 20px;
    /* left: -40px; */
    border-radius: 50%;
    margin-left: 10px;
    top: 19px;
    /* line-height: 17px; */
    background: #f79837;
    text-align: center;
    color: white;
    border: none;
}
.item_count:hover{
  background:#f79837 ;
}
.title {
    background: url('../../static/logo/logo1.png') no-repeat;
    background-position: 50% 50%;
    // background-size: 220px;
    @apply lg:bg-logopc bg-logomobile;
  }

.dropdown {
    @apply absolute;
    @apply p-3;
    @apply bg-white;
    @apply right-0;
    @apply shadow-lg;
    @apply rounded-xl;
    @apply flex;
    @apply flex-col;
    @apply border-2;
    @apply border-grey_light;
  }

  .button {
    @apply w-full;
    @apply hover:bg-grey_light;
    @apply p-2;
    @apply rounded-lg;
  }
</style>
