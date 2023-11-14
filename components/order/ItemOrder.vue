
<template>
  <div id="components-table-demo-size" class="table-item-orderad">
    <a-table :columns="columns" :data-source="itemOrder.items" size="middle" :row-key="record => record._id">
      <template slot="product" slot-scope="text,record">
        <div>
          <img :src="record.product.images[0]" alt="photo" class="w-16">
        </div>
      </template>
      <template slot="detail" slot-scope="text,record">
        <div class="flex sm:flex-row flex-col justify-between">
          <div class="flex flex-col text-black text-[1rem]">
            <p class="text-blue sm:text-xl font-medium">
              {{ record.product.name }}
            </p>
            <!-- <p>Size: {{ record.size }}</p> -->
            <p>Số lượng: x{{ record.quantity }}</p>
          </div>
          <div class="sm:pr-36 leading-7 text-black text-[1rem] font-medium ">
            <p>Giá: {{ record.price }} VND</p>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-4 text-[1rem]">
          <div>
            <span v-if="itemOrder.status === false"
              class=" text-white rounded-sm text-[0.8rem] px-1"
              :class="itemOrder.cancel === true ? 'bg-grey_dark' : 'bg-pink_hover'">
              CHỜ XÁC NHẬN
            </span>
            <span v-else class="bg-green text-white rounded-sm text-[0.8rem] px-1">
              Đặt hàng thàng công
            </span>
          </div>
          <div class="flex sm:justify-center sm:pl-10">
            <p class="font-medium sm:py-2 sm:px-3 py-1 px-2 ">
              Tổng số tiền: {{ itemOrder.totalPrice + itemOrder.items.length }} VND
            </p>
            <p class="text-color-red">{{ itemOrder.message }}</p>
          </div>
          <div class="flex sm:justify-end">
            <button v-if="comfirm"
              class="text-black font-medium text-[1rem] bg-blue rounded-full sm:py-2 sm:px-3 py-1 px-2 hover:opacity-80 mr-2"
              @click="acceptStatus(itemOrder._id)">
              Chấp nhận đơn hàng
            </button>
            <button v-if="itemOrder.status === false && itemOrder.cancel === false"
              class="text-black font-medium text-[1rem] bg-green rounded-full sm:py-2 sm:px-3 py-1 px-2 hover:opacity-80"
              @click="payment(itemOrder)">
              Thanh toán
            </button>
            <button v-if="itemOrder.status === false && itemOrder.cancel === false"
              class="text-black font-medium text-[1rem] bg-red rounded-full sm:py-2 sm:px-3 py-1 px-2 hover:opacity-80"
              @click="canceled(itemOrder._id)">
              Hủy Đơn Hàng
            </button>

            <button v-if="itemOrder.cancel === true"
              class="text-white font-medium text-[1rem] bg-grey_dark rounded-full sm:py-2 sm:px-3 py-1 px-2"
              disabled>
              Đã hủy
            </button>
          </div>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'BOOKSTORE',
    dataIndex: 'product',
    scopedSlots: { customRender: 'product' }
    // width: 200
  },
  {
    dataIndex: 'detail',
    scopedSlots: { customRender: 'detail' }
  }
]

export default {
  props: ['itemOrder', 'comfirm'],
  data () {
    return {
      columns
    }
  },
  methods: {
    async canceled (_id) {
      try {
        console.log('_id order: ', _id)
        const cancelData = {
          orderId: _id,
          cancel: true
        }
        await this.$api.order.cancelOrder(cancelData)
        this.$toast.success('Order cancel successfully', { timeout: 1500 })
        window.location.reload()
      } catch (error) {
        this.$toast.error('System Error', { timeout: 1500 })
        console.log(error)
      }
    },
    async acceptStatus (orderId) {
      try {
        console.log('orderID: ', orderId)
        const dataStatus = {
          orderId,
          status: true
        }
        await this.$api.order.acceptStatus(dataStatus)
        this.$toast.success('Order approved successfully', { timeout: 1500 })
      } catch (error) {
        this.$toast.error('System Error', { timeout: 1500 })
        console.log(error)
      }
    },
    async payment (order) {
      const vnpTmnCode = 'HT0UHLW5' // Mã website tại VNPAY
      const vnpHashSecret = 'FOMLKJFBRXZJMMOVONIYGXHLVWFRGPXI' // Chuỗi bí mật
      let vnpUrl = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
      const vnpReturnurl = 'http://localhost:3000/orders/payment'
      const vnpTxnRef = order._id // Mã đơn hàng
      const vnpOrderInfo = 'Thanh toán đơn hàng ' + order._id
      const vnpOrderType = 'billpayment'
      const vnpAmount = order.price * 100
      const vnpLocale = 'vn'
      const vnpIpAddr = '127.0.0.1'

      // Create input data object
      const inputData = {
        vnp_Version: '2.0.0',
        vnp_TmnCode: vnpTmnCode,
        vnp_Amount: vnpAmount,
        vnp_Command: 'pay',
        vnp_CreateDate: new Date().toISOString().replace(/\D/g, ''),
        vnp_CurrCode: 'VND',
        vnp_IpAddr: vnpIpAddr,
        vnp_Locale: vnpLocale,
        vnp_OrderInfo: vnpOrderInfo,
        vnp_OrderType: vnpOrderType,
        vnp_ReturnUrl: vnpReturnurl,
        vnp_TxnRef: vnpTxnRef
      }

      // Sort input data
      const sortedInputData = Object.fromEntries(Object.entries(inputData).sort())

      // Create query string
      const query = new URLSearchParams(sortedInputData).toString()

      // Create hash data
      const hashData = Object.entries(sortedInputData).map(([key, value], index) => {
        return (index === 0 ? key + '=' + value : '&' + key + '=' + value)
      }).join('')

      // Create vnpSecureHash
      const vnpSecureHash = require('crypto')
        .createHmac('sha256', vnpHashSecret)
        .update(hashData)
        .digest('hex')

      // Append secure hash to the URL
      vnpUrl = await `${vnpUrl}?${query}&vnp_SecureHashType=SHA256&vnp_SecureHash=${vnpSecureHash}`

      // Redirect to the URL
      window.open(vnpUrl, '_blank')
    }
  }
}
</script>
<style lang="scss">
#components-table-demo-size h4 {
  margin-bottom: 16px;
}

.table-item-orderad {
  .ant-table-thead>tr>th {
    @apply bg-white
  }

  .ant-table-column-title {
    @apply sm:text-xl text-black font-medium text-lg
  }

  .ant-table-pagination {
    @apply hidden
  }

  .ant-table-row {
    @apply bg-[#fafafa]
  }

  .ant-table-footer {
    @apply bg-white
  }

  .ant-table-row>td:first-child {
    @apply sm:w-52
  }
}</style>
