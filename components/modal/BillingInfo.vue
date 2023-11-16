<template>
  <div>
    <a-modal
      v-model="visible"
      title="HÓA ĐƠN"
      :footer="null"
      class="modal_order"
      width="{1000}"
      @ok="handleOk"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :colon="false"
      >
        <div class="grid sm:grid-cols-2 gap-6 grid-cols-1 max-h-[70vh] overflow-y-auto">
          <div>
            <a-form-model-item ref="fullName" label="Họ & Tên" prop="fullName">
              <a-input
                v-model="form.fullName"
                @blur="
                  () => {
                    $refs.fullName.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
            <a-form-model-item ref="phoneNumber" label="Số ĐT" prop="phoneNumber">
              <a-input
                v-model="form.phoneNumber"
                @blur="
                  () => {
                    $refs.phoneNumber.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
            <a-form-model-item ref="email" label="Email(bạn sẽ nhận được thông báo đặt hàng qua mail)" prop="email">
              <a-input
                v-model="form.email"
                @blur="
                  () => {
                    $refs.email.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
            <a-form-model-item label="Dịa chỉ giao hàng" prop="deliveryAddress">
              <a-input v-model="form.deliveryAddress" type="textarea" />
            </a-form-model-item>
          </div>
          <div class="flex justify-between mt-4">
            <div class="text-[1rem] font-medium text-black space-y-7">
              <p>
                Sản phẩm:
              </p>
              <p>
                Tổng số tiền:
              </p>
              <p>
                Phí vận chuyển:
              </p>
              <p>
                Giả giá:
              </p>
              <p>THÀNH TIỀN: </p>
            </div>
            <div class="text-black font-medium flex flex-col items-end space-y-7 pr-4 text-[1rem]">
              <p> {{ totalCart.item }} / {{ totalCart.numberProduct }} Sản phẩm</p>
              <p>
                {{ totalCart.total }} VND
              </p>
              <p>
                {{ totalCart.fee }} VND
              </p>
              <p>
                0 VND
              </p>
              <p class="text-xl text-red">
                {{ totalCart.intoMoney }} VND
              </p>
            </div>
          </div>
        </div>
        <a-form-model-item>
          <div class="flex justify-center btn_order my-5">
            <a-button class="bg-green h-10 px-7 hover:opacity-90 text-black font-medium mt-4" @click="onSubmit">
              ĐẶT HÀNG
            </a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { isValidUserName, isValidPhone, isValidEmail } from '@/assets/validators.js'
export default {
  props: ['totalCart', 'cartId'],
  data () {
    return {
      visible: false,
      form: {
        fullName: '',
        phoneNumber: '',
        deliveryAddress: '',
        email: ''
      },
      rules: {
        fullName: [{
          required: true,
          trigger: 'blur',
          validator (rule, value, callback) {
            if (isValidUserName(value)) {
              callback()
            } else {
              callback(new Error('Yêu cầu nhập tên'))
            }
          }
        }],
        deliveryAddress: [{ required: true, message: 'Yêu cầu nhập địa chỉ giao hàng', trigger: 'blur' }],
        phoneNumber: [{
          required: true,
          trigger: 'blur',
          min: 9,
          validator (rule, value, callback) {
            if (isValidPhone(value)) {
              callback()
            } else {
              callback(new Error('Yêu cầu nhập số điện thoại'))
            }
          }
        }],
        email: [{
          required: true,
          trigger: 'blur',
          validator (rule, value, callback) {
            if (isValidEmail(value)) {
              callback()
            } else {
              callback(new Error('Vui lòng nhập đúng email'))
            }
          }
        }]
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log('form: ', this.form)
          // console.log('order: ', this.cartId)
          this.submitOrder()
          this.$router.push('/order')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submitOrder () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const infoOrder = this.form
        infoOrder.user = userData.data._id
        const cartItem = this.cartId.map(item => ({
          cartId: item._id,
          product: item.product._id,
          size: item.size,
          quantity: item.quantity,
          price: item.product.price
        }))
        console.log('carrId: ', this.cartId)
        console.log('carrItem: ', cartItem)
        await this.$api.order.createOrder({ infoOrder, cartItem })
        this.$toast.success('Đặt hàng thành công', { timeout: 1500 })
        this.$store.dispatch('dataCart')
        // console.log('cartItem: ', cartItem)
        // console.log(infoOrder)
      } catch (error) {
        this.$toast.error('System error', { timeout: 1500 })
      }
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }

  }
}
</script>

<style lang="scss">
.btn_order{
  .ant-btn:hover{
    @apply bg-green/90 text-black border-green transition-all;
  }
  .ant-btn:focus{
    @apply bg-green/90 text-black border-green transition-all;
  }
}
.modal_order{
  .ant-modal{
    @apply sm:w-2/3 w-full;
  }
  .ant-modal-header{
    @apply bg-orange font-semibold ;
    .ant-modal-title{
      @apply text-lg;
    }
  }
  .ant-modal-close-ico{
    @apply text-lg;
  }
   .ant-form-item-label{
      @apply text-grey_dark font-medium;
    }
  .ant-form-item{
    @apply mb-0
  }
  .ant-form {
    label{
      @apply text-[1rem]
    }
  }
}
</style>
