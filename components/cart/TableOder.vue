<template>
  <div class="table_cart">
    <a-table
      :loading="loading"
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="carts"
      :row-key="record=>record._id"
      bordered
    >
      <template slot="product" slot-scope="text,record">
        <img :src="record.product.images[0]" alt="photo" class="w-16">
      </template>
      <div slot="information" slot-scope="text,record" class="grid sm:grid-cols-2 grid-cols-1">
        <div class="flex flex-col justify-center text-black text-[1rem]">
          <nuxt-link
            :to="{
              name: 'product_detail-id',
              params: {
                id: record.product._id,
              }

            }"
            tag="p"
            class="font-medium cursor-pointer"
          >
            {{ record.product.name }}
          </nuxt-link>
          <nuxt-link to="/" class="text-blue text-[1rem]">
            BOONSTORE
          </nuxt-link>
          <!-- <p>Size: {{ record.size }}</p> -->
        </div>
        <div class="flex flex-col sm:justify-center sm:ml-10 ">
          <div class="grid grid-cols-2">
            <div class="text-black text-[1rem] font-medium">
              <p>Giá:</p>
              <p>Số Lượng:</p>
              <p>Tổng:</p>
            </div>
            <div class="text-black font-[1rem] font-medium">
              <p>{{ record.product.price }} VND</p>
              <p>{{ record.quantity }}</p>
              <p class="text-red">
                {{ record.product.price * record.quantity }} VND
              </p>
            </div>
          </div>
        </div>
      </div>
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0" class="grid-cols-5 grid mx-20">
        <div class="ml-20 grid-cols-1 space-y-1 text-[1rem] font-medium text-black">

          <p>Số Lượng:   </p>
        </div>
        <div class="grid-cols-3 space-y-1">
          <a-select :default-value="record.size" style="width: 300px" @change="changeSize(record,$event)">
            <a-select-option v-for="item in record.product.sizes" :key="item.name" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-input-number :min="1" :max="100000" :default-value="record.quantity" @change="onChangeQuantity(record,$event)" />
        </div>
        <div class="grid-col-1 ml-20">
          <button :ref="'button'+record._id" class="flex justify-center items-center w-9 h-9 rounded-sm bg-[#008000]" disabled @click="editItem(record._id)">
            <i class="fa-solid fa-check  text-lg text-white icon-check" />
          </button>
        </div>
      </div>
      <template slot="footer">
        <!-- <hr class="mt-5 text-[#e8e8e8]"> -->
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
          <div class="flex flex-col discount_code border border-[#e8e8e8]">
            <div class=" bg-orange flex items-center pl-3 py-2">
              <h2 class="text-[1rem] font-medium text-white">
                Mã Giảm Giá
              </h2>
            </div>
            <p class=" px-3 text-[1rem] font-medium mt-5">
              Nhập mã giảm giá nếu có.
            </p>
            <a-input-search
              placeholder="Nhập mã"
              enter-button="Áp dụng"
              class="w-3/6 mt-5 px-3"
              size="large"
            />
          </div>
          <div class="flex flex-col border border-[#e8e8e8]">
            <div class=" bg-orange flex items-center pl-3 py-2">
              <h2 class="text-[1rem] font-medium text-white">
                Hóa Đơn
              </h2>
            </div>
            <div class="flex justify-between px-3 mt-5 mb-5">
              <div class="text-[1rem] font-medium text-black space-y-1">
                <p>
                  Số Lượng:
                </p>
                <p>
                  Tổng Tiền:
                </p>
                <p>
                  Phí Vận Chuyển:
                </p>
                <p>
                  Giảm Giá:
                </p>
                <p>Thành Tiền: </p>
              </div>
              <div class="text-black font-medium flex flex-col items-end space-y-1">
                <p> {{ numberProduct }} Sản phẩm</p>
                <p>
                  {{ total }} VND
                </p>
                <p>
                  {{ fee }}VND
                </p>
                <p>
                  0VND
                </p>
                <p class="text-xl text-red">
                  {{ intoMoney }} VND
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr class="mt-5 bg-[#e8e8e8] text-[#e8e8e8] h-[1.5px]">

        <div class="flex sm:justify-between w-1/2 mx-auto my-10 flex-col sm:flex-row">
          <button ref="checkOutCarts" class="bg-green text-white py-2 px-2 text-[1rem] font-medium rounded-sm" disabled @click="showBilling">
            <i class="fa-solid fa-cart-shopping" />
            Mua ({{ numberProduct }})
          </button>
          <button ref="deleteCarts" disabled class="bg-red text-white py-2 px-2 text-[1rem] font-medium rounded-sm" @click="deleteCarts">
            <i class="fa-solid fa-trash" />
            Xóa ({{ numberProduct }})
          </button>
        </div>
      </template>
    </a-table>
    <billing-info ref="billing" :total-cart="totalCarts" :cart-id="selectedCartId" />
  </div>
</template>
<script>
// import FormInfo from '@/components/cart/FormInfo.vue'
import BillingInfo from '@/components/modal/BillingInfo.vue'
const columns = [
  {
    title: 'SÁCH',
    key: 'product',
    dataIndex: 'product',
    scopedSlots: { customRender: 'product' }
  },
  {
    // title: 'information',
    dataIndex: 'information',
    key: 'information',
    scopedSlots: { customRender: 'information' }
  }
]
export default {
  components: {
    // FormInfo
    BillingInfo
  },
  data () {
    return {
      columns,
      total: 0,
      item: 0,
      numberProduct: 0,
      fee: 0,
      loading: false,
      intoMoney: 0,
      totalCarts: {},
      selectedSize: [],
      selectedNumber: [],
      selectedCartId: []
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.total = selectedRows.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.product.price
          }, 0)
          this.item = selectedRows.reduce((accumulator, item) => {
            return accumulator + item.quantity
          }, 0)
          this.numberProduct = selectedRows.length
          if (selectedRows.length > 0) {
            this.$refs.checkOutCarts.disabled = false
            this.$refs.deleteCarts.disabled = false
          } else {
            this.$refs.checkOutCarts.disabled = true
            this.$refs.deleteCarts.disabled = true
          }
          // selectedRows.forEach((item) => {
          //   this.selectedCartId.push(item)
          // })
          this.selectedCartId = selectedRows
          // console.log('selectCartId', this.selectedCartId)
          this.fee = selectedRows.length
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.intoMoney = this.total + this.fee
          const totalCartCopy = {
            numberProduct: this.numberProduct,
            item: this.item,
            total: this.total,
            fee: this.fee,
            intoMoney: this.intoMoney
          }
          this.totalCarts = { ...totalCartCopy }
        }

      }
    },
    carts () {
      return this.$store.getters.carts
    }
  },
  methods: {
    changeSize (key, value) {
      const refButton = key._id
      this.$refs[`button${refButton}`].disabled = false
      const isSize = this.selectedSize.some((item) => {
        return item._id === key._id
      })
      if (isSize) {
        this.selectedSize.find((item) => {
          return item._id === key._id
        }).size = value
        // console.log('selectSize update ', this.selectedSize)
      } else {
        this.selectedSize.push({ _id: key._id, product: key.product._id, size: value })
        // console.log(this.selectedSize)
      }
    },
    onChangeQuantity (key, value) {
      const refButton = key._id
      this.$refs[`button${refButton}`].disabled = false

      const isNumber = this.selectedNumber.some((item) => {
        return item._id === key._id
      })
      if (isNumber) {
        this.selectedNumber.find((item) => {
          return item._id === key._id
        }).quantity = value
        // console.log('selectSize update ', this.selectedNumber)
      } else {
        this.selectedNumber.push({ _id: key._id, product: key.product._id, quantity: value })
        // console.log(this.selectedNumber)
      }
      // console.log('valueNumber', this.valueNumber)
    },
    async editItem (idCartItem) {
      try {
        this.loading = await true
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const sizeUpdate = this.selectedSize.find((item) => {
          return item._id.toString() === idCartItem.toString()
        })
        const numberUpdate = this.selectedNumber.find((item) => {
          return item._id.toString() === idCartItem.toString()
        })
        let cartItem
        if (sizeUpdate && numberUpdate) {
          cartItem = {
            _id: idCartItem,
            product: sizeUpdate.product,
            quantity: numberUpdate.quantity,
            size: sizeUpdate.size
          }
        } else if (sizeUpdate) {
          cartItem = {
            _id: idCartItem,
            product: sizeUpdate.product,
            size: sizeUpdate.size,
            quantity: this.carts.find((item) => { return item._id.toString() === idCartItem.toString() }).quantity
          }
        } else if (numberUpdate) {
          cartItem = {
            _id: idCartItem,
            product: numberUpdate.product,
            quantity: numberUpdate.quantity,
            size: this.carts.find((item) => { return item._id.toString() === idCartItem.toString() }).size

          }
        }
        cartItem.user = userData.data._id
        await this.$api.cart.updateCartItem(cartItem)
        this.$toast.success('You have successfully updated your cart', { timeout: 1500 })
        this.$store.dispatch('dataCart')
        this.loading = false
        // console.log('CartItem: ', cartItem)
      } catch (error) {
        this.$toast.error('System error please try again later', { timeout: 1500 })
        // console.log(error)
        this.loading = false
      }
    },
    async deleteCarts () {
      try {
        // console.log('delete', this.selectedCartId)
        await this.$api.cart.deleteCartItem({ cartId: this.selectedCartId })
        this.$store.dispatch('dataCart')
        this.$toast.success('Remove product from cart successfully', { timeout: 1500 })
      } catch (error) {
        console.log(error)
      }
    },
    showBilling () {
      this.$refs.billing.showModal()
    }
  }
}
</script>

<style lang="scss">
  .discount_code{
    .ant-input-search-button{
      @apply bg-[#321fdb] hover:opacity-90
    }
    // .ant-input{
    //   @apply py-2
    // }
  }
.table_cart{

  .ant-table-bordered .ant-table-tbody > tr > td:not(:first-child):not(:last-child) {
     @apply border-r-0 border-l-0
  }
  .ant-table-bordered .ant-table-tbody > tr > td:first-child {
     @apply border-r-0
  }
  .ant-table-bordered .ant-table-thead > tr > th:not(:first-child):not(:last-child) {
     @apply border-r-0
  }
  .ant-table-bordered .ant-table-thead > tr > th:first-child {
     @apply border-r-0
  }
  .icon-check{
    @apply text-white
  }
  .ant-table-thead > tr > th{
    @apply bg-orange
  }
  .ant-table-column-title{
    @apply font-semibold text-white
  }
}

</style>
