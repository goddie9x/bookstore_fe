<template>
  <div :class="[ openModal ? 'fixed flex ' : 'w-0 h-0', 'modal-login']">
    <div class="flex items-center justify-center modal-background_login w-full h-full" :class="closeForm ?'w-full h-0 -top-full modal-animation-cllogin duration-500':'' ">
      <div class="modal-wrapper-login grid md:grid-cols-2 lg:grid-cols-2  grid-cols-1 overflow-hidden drop-shadow-lg transition-all " :class="openModal ? 'lg:w-full lg:mb-0 lg:h-full h-[70%] w-[90%] modal-animation-login ease-in-out':''">
        <div class="img-login md:block hidden">
          <div class="flex  flex-col absolute right-0 w-1/4 h-full justify-center space-y-1">
            <button type="submit" :class="islogin ? 'bg-btn_click' : 'bg-btn_noclick' " class="rounded-l-full font-semibold px-2 py-3 bg-black text-pink w-full" @click="changeIsLogin(true)">
              {{ loginBtnLabel }}
            </button>
            <button type="submit" :class="!islogin ? 'bg-btn_click' : 'bg-btn_noclick' " class="rounded-l-full font-semibold px-2 py-3 w-full" @click="changeIsLogin(false)">
              Đăng ký
            </button>
          </div>
        </div>
        <div class="overflow-y-auto">
          <div class=" flex items-center justify-between py-5 px-8">
            <div v-if="islogin">
              <p class="text-2xl text-black font-semibold">
                Đăng nhập
              </p>
              <p class="font-medium">
                Đăng nhập thôi nào!
              </p>
            </div>
            <div v-else>
              <p class="text-2xl font-semibold text-black">
                Đăng ký
              </p>
              <!-- <p class="font-medium">
                Create an account free and enjoy it
              </p> -->
            </div>
            <button class="delete" aria-label="close" @click="closeModal">
              <i class="fa-regular fa-xmark text-[1.25rem] font-semibold hover:text-red" />
            </button>
          </div>
          <form v-if="islogin" action="#" method="post" @submit="checkForm">
            <section class="px-5 pt-5 rounded-b-2xl">
              <div v-if="!isUserLoggedIn && !isForgot">
                <div class="m-4">
                  <input
                    v-model="email"
                    :class="[highlightEmailWithError ? 'input border-red' : 'input']"
                    type="email"
                    placeholder="Địa chỉ Email"
                    name="emailName"
                    @keyup="checkEmailOnKeyUp(email)"
                  >
                  <p v-if="highlightEmailWithError" class="text-red">
                    {{ emailRequiredLabel }}
                  </p>
                </div>
                <div class="m-4">
                  <input
                    v-model="password"
                    :class="[highlightPasswordWithError ? 'input border-red' : 'input']"
                    type="password"
                    placeholder="Mật khẩu"
                    name="passwordName"
                    @keyup="checkPasswordOnKeyUp(password)"
                  >
                  <p v-if="highlightPasswordWithError" class="text-red">
                    {{ passwordRequiredLabel }}
                  </p>
                </div>
              </div>
              <div v-if="isSendMail && isForgot && !updateForgot && !requestEmail" class="flex text-center bg-[#98FB98] py-1 justify-center mx-4 rounded-sm">
                <p class="font-medium">
                  <i class="fa-solid fa-check" /> OTP sent to your gmail
                </p>
              </div>
              <div v-if="!isSendMail && isForgot && !updateForgot && requestEmail" class="flex text-center bg-[#FF9494] py-1 justify-center mx-4 rounded-sm">
                <p class="font-medium">
                  <i class="fa-solid fa-xmark text-red" /> OTP request failed
                </p>
              </div>
              <div v-if="updateForgot && isForgot && !updateForgotFailed" class="flex text-center bg-[#98FB98] py-1 justify-center mx-4 rounded-sm">
                <p class="font-medium">
                  <i class="fa-solid fa-check" /> Forgot password sent successfully
                </p>
              </div>
              <div v-if="isForgot && updateForgotFailed" class="flex text-center bg-[#FF9494] py-1 justify-center mx-4 rounded-sm">
                <p class="font-medium">
                  <i class="fa-solid fa-xmark text-red" /> Forgot Password recovery failed
                </p>
              </div>
              <div class="m-4 flex lg:justify-between lg:flex-row flex-col items-center">
                <button v-if="!isUserLoggedIn && !isForgot" type="submit" class="rounded-xl p-3 font-semibold bg-yellow hover:bg-pink_hover text-white lg:w-1/3 w-full">
                  {{ loginBtnLabel }}
                </button>
                <p v-if="!isForgot" class="font-medium text-black hover:text-black cursor-pointer hover:transition-all lg:m-0 m-1" @click="forgotPass(true)">
                  Quên mật khẩu
                </p>
              </div>
              <div v-if="isForgot" class="m-4 flex flex-col text-center items-center animation-forgot">
                <div class="flex flex-col w-full space-y-4 mb-4">
                  <a-spin :spinning="spinning">
                    <div class="spin-content">
                      <div class="w-full">
                        <input
                          v-model="formForgot.email"
                          type="text"
                          name="emailForgot"
                          placeholder="Địa chỉ Email"
                          class="input w-full"
                          @keyup="checkEmailForgotOnKeyUp(formForgot.email)"
                        >
                        <p v-if="highlightEmailForgotWithError" class="text-red">
                          {{ emailRequiredLabel }}
                        </p>
                      </div>
                    </div>
                  </a-spin>
                  <div v-if="isSendMail" class="w-full animation-forgot2">
                    <input
                      v-model="formForgot.otp"
                      type="text"
                      name="otp"
                      placeholder="OTP"
                      class="input w-full"
                    >
                    <p v-if="highlightOtpForgotWithError" class="text-red">
                      {{ otpNotValidLabel }}
                    </p>
                  </div>
                  <div v-if="isSendMail" class="w-full animation-forgot2">
                    <input
                      v-model="formForgot.newPass"
                      type="password"
                      name="otp"
                      placeholder="Mật khẩu mới"
                      class="input w-full"
                      @keyup="checkPasswordForgotOnKeyUp(formForgot.newPass)"
                    >
                    <p v-if="highlightNewPassForgotWithError" class="text-red">
                      {{ passwordRequiredLabel }}
                    </p>
                  </div>
                  <!-- <input v-model="formForgot.otp" type="text" name="OTP" placeholder="OTP" class="input"> -->
                  <!-- <input v-model="formForgot.newPass" type="text" name="OTP" placeholder="New Password" class="input"> -->
                </div>
                <div class="flex justify-center text-center space-x-4 w-full">
                  <div class="w-full">
                    <p v-if="!isSendMail" class="rounded-xl p-3 font-semibold bg-pink hover:bg-pink_hover text-pink w-full cursor-pointer" @click="changeIsEmail(true)">
                      Gửi Email
                    </p>
                    <p v-else class="rounded-xl p-3 font-semibold bg-pink hover:bg-pink_hover text-pink w-full cursor-pointer" @click="submitForgotPass">
                      Quên mật khẩu
                    </p>
                  </div>
                  <p class="cursor-pointer rounded-xl p-3 font-semibold bg-pink hover:bg-pink_hover text-pink w-full" @click="forgotPass(false)">
                    Quay lại
                  </p>
                </div>
              </div>
            </section>
          </form>
          <!-- signup  -->
          <Signup v-else @to-login="updateLogin" />

          <div class="mx-4 flex-col px-5">
            <div class="md:hidden flex right-0  w-full justify-center space-y-1">
              <button type="submit" :class="islogin ? '' : 'bg-btn_noclick hidden' " class="rounded-xl font-semibold px-2  py-3 bg-grey_dark text-pink w-full" @click="changeIsLogin(false)">
                Đăng ký
              </button>
              <button type="submit" :class="!islogin ? '' : 'bg-btn_noclick hidden' " class="rounded-xl bg-grey_dark text-pink font-semibold px-2 py-3 w-full" @click="changeIsLogin(true)">
                Đăng nhập
              </button>
            </div>
            <p class="text-base font-medium text-black" style="color:black">
              Hoặc đăng nhập:
            </p>
            <div class="flex mt-2 mr-1 space-x-2">
              <a class="icon_face w-10 h-10 rounded-full bg-blue_lights  transition-all flex justify-center items-center">
                <i class="fab fa-facebook-f text-base text-pink " />
              </a>
              <a class="icon_twitter bg-[#00acee] w-10 h-10 rounded-full flex justify-center items-center">
                <i class="fab fa-twitter text-base text-pink" />
              </a>
              <a class="icon_google bg-[#CC3333] w-10 h-10 rounded-full flex justify-center items-center">

                <i class="fab fa-google-plus-g text-base text-pink" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Signup from './Signup.vue'
import { isValidEmail, isValidPassword } from '@/assets/validators'
export default {
  name: 'Login',
  components: {
    Signup
  },
  data () {
    return {
      spinning: false,
      isSendMail: false,
      isForgot: false,
      updateForgot: false,
      updateForgotFailed: false,
      requestEmail: false,
      islogin: true,
      closeForm: null,
      loginBtnLabel: 'Đăng nhập',
      emailRequiredLabel: 'Yêu cầu Email',
      passwordRequiredLabel: 'Yêu cầu mật khẩu',
      emailNotValidLabel: 'Yêu cầu email hợp lệ',
      otpNotValidLabel: 'Yêu cầu otp hợp lệ',
      passworNotValidLabel: 'Yêu cầu mật khẩu hợp lệ',
      btnLoggedInLabel: 'Đóng',
      email: '',
      password: '',
      highlightEmailWithError: null,
      highlightEmailForgotWithError: null,
      highlightPasswordWithError: null,
      highlightOtpForgotWithError: null,
      highlightNewPassForgotWithError: null,
      isFormSuccess: false,
      formForgot: {
        email: '',
        otp: '',
        newPass: ''
      }
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    openModal () {
      if (this.$store.getters.isLoginModalOpen) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.closeForm = false

        return true
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.closeForm = true
        return false
      }
    }
  },

  methods: {
    async changeIsEmail (e) {
      try {
        if (isValidEmail(this.formForgot.email)) {
          this.spinning = true
          await this.$api.user.sendOtp({ email: this.formForgot.email })
          this.spinning = false

          this.isSendMail = e
          this.highlightEmailForgotWithError = false
          this.requestEmail = false
        } else {
          this.highlightEmailForgotWithError = true
        }
      } catch (error) {
        console.log('error: ', error)
        this.requestEmail = true
        this.spinning = false
      }
    },
    async submitForgotPass () {
      try {
        if (!this.formForgot.email) {
          this.highlightEmailForgotWithError = true

          if (this.formForgot.email && !isValidEmail(this.formForgot.email)) {
            this.emailRequiredLabel = this.emailNotValidLabel
          }
        }
        if (!this.formForgot.newPass || !isValidPassword(this.formForgot.newPass)) {
          this.highlightNewPassForgotWithError = true
        }
        if (this.formForgot.otp.trim().length < 1) {
          this.highlightOtpForgotWithError = true
        } else {
          this.highlightOtpForgotWithError = false
        }
        if (isValidEmail(this.formForgot.email) && isValidPassword(this.formForgot.newPass) && this.formForgot.otp.trim().length > 0) {
          console.log('Form forgot: ', this.formForgot)
          await this.$api.user.forgotPass(this.formForgot)
          this.updateForgot = true
          this.requestEmail = false
          this.updateForgotFailed = false
        }
      } catch (error) {
        this.updateForgotFailed = true
        this.updateForgot = true
      }
    },
    forgotPass (a) {
      this.isForgot = a
      this.isSendMail = false
      this.updateForgot = false
      this.requestEmail = false
      this.updateForgotFailed = false
    },
    updateLogin (e) {
      this.islogin = true
      // console.log(e)
    },
    changeIsLogin (a) {
      this.islogin = a
      // console.log(this.islogin)
      this.$store.commit('isUserSignedUp', false)
    },
    closeModal () {
      this.$store.commit('showLoginModal', false)
    },
    async checkForm (e) {
      e.preventDefault()
      try {
        if (!this.email) {
          this.highlightEmailWithError = true

          if (this.email && !isValidEmail(this.email)) {
            this.emailRequiredLabel = this.emailNotValidLabel
          }
        }
        if (!this.password || !isValidPassword(this.password)) {
          this.highlightPasswordWithError = true
        }
        if (isValidEmail(this.email) && isValidPassword(this.password)) {
          const resData = await this.$api.auth.signin(this.email, this.password)
          localStorage.setItem('token', resData.data.token)
          localStorage.setItem('info', JSON.stringify(resData.data.info))
          if (resData.data.info.admin) {
            this.$store.commit('isAdmin', resData.data.info.admin)
          }
          this.isFormSuccess = true
          this.$store.commit('showLoginModal', false)
          this.$store.commit('isUserLoggedIn', this.isFormSuccess)
          this.$store.commit('setUserName', resData.data.info.username)
          this.$store.commit('avatar', resData.data.info.avatar)
          this.$store.dispatch('dataCart')
          this.$store.dispatch('dataWishlist')
          if (!resData.data.info.admin) {
            window.$crisp.push(['do', 'session:reset'])
            // console.log(resData.data.info.username)
            window.CRISP_TOKEN_ID = resData.data.info.username
            await window.$crisp.push(['do', 'chat:show'])
          } else {
            await window.$crisp.push(['do', 'chat:hide'])
          }
          window.location.reload(true)
          this.$toast.success('Đăng nhập thành công!', { timeout: 1500 })
        }
      } catch (error) {
        this.highlightEmailWithError = true
        this.highlightPasswordWithError = true
        // console.log(error)
      }
    },
    checkEmailOnKeyUp (emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false
      } else {
        this.highlightEmailWithError = true

        if (!isValidEmail(emailValue)) {
          this.emailRequiredLabel = this.emailNotValidLabel
        }
      }
    },
    checkEmailForgotOnKeyUp (emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailForgotWithError = false
      } else {
        this.highlightEmailForgotWithError = true

        if (!isValidEmail(emailValue)) {
          this.emailRequiredLabel = this.emailNotValidLabel
        }
      }
    },
    checkPasswordOnKeyUp (passwordValue) {
      if (passwordValue && isValidPassword(passwordValue)) {
        this.highlightPasswordWithError = false
      } else {
        this.highlightPasswordWithError = true
      }
      if (!isValidPassword(passwordValue)) {
        this.passwordRequiredLabel = this.passworNotValidLabel
      }
    },
    checkPasswordForgotOnKeyUp (passwordValue) {
      if (passwordValue && isValidPassword(passwordValue)) {
        this.highlightNewPassForgotWithError = false
      } else {
        this.highlightNewPassForgotWithError = true
      }
      if (!isValidPassword(passwordValue)) {
        this.passwordRequiredLabel = this.passworNotValidLabel
      }
    }
  }
}
</script>

<style lang="scss">
  .animation-forgot{
    @apply animate-[slideInLeft_0.4s_ease-out]
  }
  .animation-forgot2{
    @apply animate-[slideBottom_0.4s_ease-out]

  }
  .fa-exclamation-circle {
    @apply text-red;
  }
  .fa-check {
    @apply text-green;
  }
  .modal-wrapper-login {
    @apply bg-white;
    @apply z-20;
    @apply rounded-2xl;
    @apply lg:w-[750px] lg:h-[550px] ;
  }
  .img-login{
     background-image: url(@/static/banner/nen.jpg);
     background-position: right;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
  }

  .bg-btn_click{
    @apply bg-black text-white
  }
  .bg-btn_noclick{
    @apply bg-white text-black
  }

  .icon_face:hover{
      @apply bg-white border-[1px] transition-all;
    .fa-facebook-f{
      @apply text-[#3b5998];
     }
  }
.icon_twitter:hover{
      @apply bg-white border-[1px] transition-all;
    .fa-twitter{
      @apply text-[#00acee];
     }
  }
  .icon_google:hover{
      @apply bg-white border-[1px] transition-all border-[#CC3333];
    .fa-google-plus-g{
      @apply text-[#CC3333];
     }
  }
  .ant-notification-notice-with-icon{
    @apply flex items-center font-medium
  }
  .ant-notification-notice {
    @apply py-5
  }
  .ant-notification-notice-description{
    @apply m-1 text-lg
  }
</style>
