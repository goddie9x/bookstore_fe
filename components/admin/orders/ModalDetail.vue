<template>
  <div>
    <a-modal v-model="visible" :footer="null" title="ĐƠN HÀNG" width="{980}" class="modal_detail max-h-[50vh] overflow-y-auto">
      <a-table
        :columns="columns"
        :data-source="itemOrder.items"
        :row-key="record=>record._id"
        class="table-show_order"
        :pagination="false"
        :scroll="{y:250}"
      >
        <a slot="product" slot-scope="text,record">{{ record.product.name }}</a>
        <p slot="price" slot-scope="text,record">
          ${{ record.product.price }}
        </p>
        <template slot="image" slot-scope="text,record">
          <img :src="record.product.images[0]" alt="photo" class="w-12">
        </template>
        <template slot="footer">
          <div class="flex flex-col">
            <div>
              <a-form-model-item label="Địa chỉ giao hàng">
                <a-input
                  v-model="address"
                  disabled
                />
              </a-form-model-item>
              <div class="flex sm:w-full sm:flex-row flex-col  sm:space-x-3">
                <a-form-model-item label="Phí vận chuyển" class="w-full">
                  <a-input
                    v-model="fee"
                    disabled
                    addon-after="VND"
                  />
                </a-form-model-item>
                <a-form-model-item label="Tổng" class="w-full">
                  <a-input
                    v-model="totalPrice"
                    disabled
                    addon-after="VND"
                  />
                </a-form-model-item>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-1">
              <button v-if="comfirm" class="w-1/4 text-white font-medium text-[1rem] bg-green rounded-lg sm:py-2  py-1 px-1 hover:opacity-80 mr-2" @click="acceptStatus(itemOrder._id)">
                Nhận đơn hàng
              </button>
              <button v-if="itemOrder.status===false &&itemOrder.cancel===false" class="w-1/4 text-white font-medium text-[1rem] bg-red rounded-lg sm:py-2  py-1 px-1 hover:opacity-80" @click="canceled(itemOrder._id)">
                Hủy đơn hàng
              </button>
            </div>
          </div>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: 'SÁCH',
    dataIndex: 'product',
    key: 'product',
    scopedSlots: { customRender: 'product' }
  },
  {
    title: 'Ảnh',
    dataIndex: 'images',
    key: 'image',
    scopedSlots: { customRender: 'image' }
  },
  // {
  //   title: 'Số lượng kho',
  //   dataIndex: 'size',
  //   key: 'size',
  //   width: 80
  // },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    width: 80,
    scopedSlots: { customRender: 'price' }

  }
]
export default {
  props: ['itemOrder', 'comfirm'],
  data () {
    return {
      visible: false,
      columns,
      address: '',
      totalPrice: '',
      fee: 0
    }
  },
  watch: {
    itemOrder () {
      this.address = this.itemOrder.deliveryAddress
      this.totalPrice = this.itemOrder.totalPrice
      this.fee = this.itemOrder.items.length
      console.log('order:', this.itemOrder)
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    async acceptStatus (orderId) {
      try {
        console.log('orderID: ', orderId)
        const dataStatus = {
          orderId,
          status: true
        }
        await this.$api.order.acceptStatus(dataStatus)
        this.$toast.success('Đơn hàng được phê duyệt thành công!', { timeout: 1500 })
        window.location.reload()
      } catch (error) {
        this.$toast.error('System Error', { timeout: 1500 })
        console.log(error)
      }
    },
    async canceled (_id) {
      try {
        console.log('_id order: ', _id)
        const cancelData = {
          orderId: _id,
          cancel: true
        }
        await this.$api.order.cancelOrder(cancelData)
        this.$toast.success('Hủy đơn hàng thành công!', { timeout: 1500 })
        window.location.reload()
      } catch (error) {
        this.$toast.error('System Error', { timeout: 1500 })
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
// .modal_detail{
//   .ant-modal-header{
//     // @apply bg-orange
//   }
// }
.table-show_order{
  .ant-table td { white-space: nowrap; }
  .ant-table-thead > tr > th  {
      @apply bg-orange
  }
  .ant-table-tbody > tr > td:first-child {
     @apply border-l-[#e8e8e8] border-l
  }
  .ant-table-tbody > tr > th:first-child {
     @apply border-l-[#e8e8e8] border-l
  }
  .ant-table-tbody > tr > td:last-child {
     @apply border-r-[#e8e8e8] border-r
  }
  .ant-table-tbody > tr > th:last-child {
     @apply border-r-[#e8e8e8] border-r
  }
  .ant-table-footer{
    @apply border border-[#e8e8e8]
  }

  .ant-input{
    @apply text-black
  }
  td{
    @apply text-black
  }
  .ant-form-item{
    @apply mb-0
  }
  label{
    @apply font-medium
  }

}
</style>
