<template>
  <a-form-model
    :model="form"
    :colon="false"
  >
    <div class="flex items-center">
      <img v-if="!formDataIm.datas" :src="form.avatar" alt="photo" class="w-36">
      <img v-else :src="formDataIm.datas" alt="photo" class="w-36">
      <div class="ml-4">
        <label for="inputfile" class="cursor-pointer text-black">
          <span class="font-semibold">
            <i class="fa-regular fa-folder-open text-2xl" /> Upload Avatar
          </span>
          <input
            id="inputfile"
            type="file"
            accept=".jpeg,.jpg,.png,image/jpeg,image/png"
            aria-label="upload image button"
            placeholder="up"
            style="display:none"
            @change="selectFile"
          >
        </label>
      </div>
      <div v-if="isUpLoadAvatar" class="flex space-x-4 ml-3">
        <button class="w-20 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-red" @click="upLoad">
          Save
        </button>
        <button class="w-20 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-black" @click="cancelUpLoad">
          Cancel
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-7">
      <a-form-model-item ref="email" label="Email">
        <a-input
          v-model="form.email"
          disabled
        />
      </a-form-model-item>
      <a-form-model-item ref="username" label="Username">
        <a-input
          v-model="form.username"
          disabled
        />
      </a-form-model-item>
    </div>
    <div v-if="isChangePassword">
      <ChangePassword @cancelUpdatePassword="cancelUpdatePass" />
    </div>
    <div v-if="!isChangePassword" class="flex">
      <button class="w-36 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-black font-medium" @click="changePassword">
        Change Password
      </button>
    </div>
    <div v-if="isChangePassword" class="flex justify-center space-x-4">
      <!-- <button class="w-28 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-red font-medium" @click="onSubmit">
        Save
      </button>
      <button class="w-28 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-black font-medium" @click="cancelPassword">
        Cancel
      </button> -->
    </div>
  </a-form-model>
</template>
<script>
import ChangePassword from './ChangePassword.vue'
export default {
  components: {
    ChangePassword
  },
  data () {
    return {
      isUpLoadAvatar: false,
      isChangePassword: false,
      other: '',
      formDataIm: {
        files: '',
        datas: ''
      },
      form: {
        username: '',
        email: '',
        avatar: ''
      }
    }
  },
  mounted () {
    if (localStorage.getItem('info')) {
      this.infoUser()
    }
  },
  methods: {
    infoUser () {
      const userInfo = JSON.parse(localStorage.getItem('info'))
      this.form = { ...userInfo }
    },
    cancelUpdatePass (e) {
      console.log('emit ', e)
      this.isChangePassword = e
    },
    changePassword () {
      this.isChangePassword = true
    },
    cancelPassword () {
      this.isChangePassword = false
    },
    cancelUpLoad () {
      this.isUpLoadAvatar = false
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    async selectFile (e) {
      this.isUpLoadAvatar = true
      const file = e.target.files[0]
      this.formDataIm.files = file
      /* Make sure file exists */
      if (!file) { return }

      /* create a reader */
      const readData = f => new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(f)
      })

      /* Read data */

      const data = await readData(file)
      // console.log('data: ', data)
      this.formDataIm.datas = data

      /* upload the converted data */
    },
    async cloudinary () {
      console.log(this.formDataIm.datas)
      await this.$cloudinary.upload(this.formDataIm.datas, {
        folder: 'Home/avatar',
        uploadPreset: 'bnmyktwk'
      }).then((res) => { this.form.avatar = (res.url) })
      // console.log(this.form.avatar)
    },
    async upLoad () {
      try {
        const userInfo = JSON.parse(localStorage.getItem('info'))
        await this.cloudinary()
        await this.$api.user.editAvatar(userInfo._id, { avatar: this.form.avatar })
        userInfo.avatar = this.form.avatar
        localStorage.setItem('info', JSON.stringify(userInfo))
        this.$store.commit('avatar', this.form.avatar)
        this.$toast.success('Upload avatar successful!', { timeout: 1500 })
        this.isUpLoadAvatar = false
      } catch (error) {
        this.$toast.error('Upload avatar error', { timeout: 1500 })
      }
    }
  }
}
</script>
