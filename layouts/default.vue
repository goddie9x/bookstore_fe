<template>
  <div>
    <VmHeader />
    <main>
      <nuxt />
      <VmLoginModal />
      <VmCheckoutModal />
      <VmSearchModal />
      <VmWishList />
    </main>
    <VmFooter />
  </div>
</template>

<script>
import VmHeader from '@/components/header/Header'
import VmFooter from '@/components/footer/Footer'
import VmLoginModal from '@/components/modal/Login'
import VmCheckoutModal from '@/components/modal/Checkout'
import VmWishList from '@/components/modal/WishList'
import VmSearchModal from '@/components/modalsearch/ModalSearch'

export default {
  components: {
    VmHeader,
    VmFooter,
    VmLoginModal,
    // VmSignupModal,
    VmCheckoutModal,
    VmSearchModal,
    VmWishList
  }
}
</script>

<style lang="scss">
  body {
    @apply flex;
    @apply flex-col;
    height:100vh;
    margin:0;
  }

  .input {
    @apply block;
    @apply w-full;
    @apply px-4;
    @apply py-2;
    @apply text-[1rem];
    @apply font-normal;
    @apply bg-white;
    @apply bg-clip-padding;
    @apply border;
    @apply border-solid;
    @apply rounded;
    @apply transition;
    @apply ease-in-out;
    @apply m-0;
    @apply focus:bg-white;
    @apply focus:outline-none;
  }

  .modal {
    @apply top-0;
    @apply right-0;
    @apply left-0;
    @apply bottom-0;
    @apply z-50;
    @apply items-center;
    @apply justify-center;
  }
 .modal-login {
    @apply top-0;
    @apply right-0;
    @apply left-0;
    @apply bottom-0;
    @apply z-50;
    @apply items-center;
    @apply justify-center;
  }
  .modal-checkout {
    @apply top-0;
    @apply right-0;
    @apply left-0;
    @apply bottom-0;
    @apply z-50;
    // @apply items-center;
    @apply justify-end;
  }
  .modal-background {
    @apply bg-grey_dark/80;
    @apply w-full;
    @apply h-full;
    @apply z-10;
    @apply fixed;
    @apply top-0;
    transition: all .3s ease 0s;
  }
  .modal-background_login {
    @apply bg-grey_dark/80;
    // @apply w-full;
    // @apply h-full;
    @apply z-10;
    @apply fixed;
    // @apply top-0;
    // transition: all .3s ease 0s;
  }
  .modal-wrapper {
    @apply bg-white;
    @apply z-20;
    @apply rounded-2xl;
    @apply w-96;
  }
 .modal-wrapper-checkout {
    @apply bg-white;
    @apply z-20;
    @apply lg:w-96 w-80;
  }
   .modal-wrapper-search {
    // @apply bg-white;
    @apply bg-light/80;
    @apply z-20;
    // @apply rounded-2xl;
    @apply w-full h-full;
  }

  .modal-animation{
      // @apply animate-[slideInLeft_2s_ease_out] ;
      @apply animate-[slideInLeft_0.4s_ease-out]
  }
  .modal-animation-close{
    @apply animate-[slideInRight_0.4s_ease]
  }
  .modal-animation-login{
  @apply  animate-[slideTop_0.4s_ease-out]
  }
  .modal-animation-cllogin{
  @apply  animate-[slideBottom_1s_ease-out]
  }
</style>
