<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :colon="false">
    <div class=" grid grid-cols-3 gap-6 form-password">
      <a-form-model-item has-feedback label="Current password" prop="currentPass">
        <a-input v-model.number="ruleForm.currentPass" type="password" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="New password" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Re-password" prop="checkPass">
        <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </a-form-model-item>
    </div>

    <div class="flex justify-center space-x-4">
      <button class="w-28 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-red font-medium" @click="submitForm('ruleForm')">
        Save
      </button>
      <button class="w-28 h-9 border border-solid border-[#e0e0e0] rounded-full hover:border-black font-medium" @click="cancel(false)">
        Cancel
      </button>
    </div>
  </a-form-model>
</template>
<script>
import { isValidPassword } from '@/assets/validators.js'
export default {
  data () {
    let checkPending
    const checkCurrentPass = (rule, value, callback) => {
      clearTimeout(checkPending)
      if (!value) {
        return callback(new Error('Please input the current password!'))
      }
      checkPending = setTimeout(() => {
        if (!isValidPassword(value)) {
          callback(new Error('Invalid password format!'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (!isValidPassword(value)) {
        callback(new Error('Invalid password format!'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        currentPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        currentPass: [{ validator: checkCurrentPass, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          const userInfo = JSON.parse(localStorage.getItem('info'))._id
          const dataSubmit = {
            userId: userInfo,
            currentPass: this.ruleForm.currentPass,
            newPass: this.ruleForm.pass
          }
          console.log('dataSubmit: ', dataSubmit)
          this.resetPass(dataSubmit)
          this.cancel(false)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async resetPass (data) {
      try {
        await this.$api.user.resetPass(data)
        this.$toast.success('Change password successfully', { timeout: 1500 })
      } catch (error) {
        this.$toast.error('Change password failed', { timeout: 1500 })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    cancel (item) {
      this.$emit('cancelUpdatePassword', item)
    }
  }
}
</script>

<style lang="scss">
.form-changepassword{
    .ant-form-item-label{
        @apply flex flex-col
    }
}
</style>
