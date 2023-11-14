<template>
  <div class="flex flex-col mt-5 px-14">
    <a-spin :spinning="spinning">
      <div class="spin-content">
        <div class="tab_order">
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="TẤT CẢ GIAO DỊCH">
              <div v-if="allTransaction.totalItem<1" class="flex justify-center">
                <p class="text-black font-medium sm:text-xl mx-0 my-10">
                  Bạn chưa có giao dịch nào!
                </p>
              </div>
              <div v-for="(item,index) in allTransaction.listOrder" :key="index" class="mb-4">
                <ItemOrder
                  :item-order="item"
                  :status="item.status"
                  :cancel="item.cancel"
                />
                <hr class="text-[#e8e8e8]">
              </div>
              <div v-if="allTransaction.totalItem>=1" class="flex justify-center my-2">
                <a-pagination v-model="current" :total="allTransaction.pages*8" show-less-items :page-size="8" @change="onChangeAll" />
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="CHỜ XÁC NHẬN" force-render>
              <div v-if="waitForComfirm.totalItem<1" class="flex justify-center">
                <p class="text-black font-medium sm:text-xl mx-0 my-10">
                  Không có hóa đơn nào đang chờ xác nhận!
                </p>
              </div>
              <div v-for="(item,index) in waitForComfirm.listOrder" :key="index" class="mb-4">
                <ItemOrder
                  :item-order="item"
                  :status="item.status"
                  :cancel="item.cancel"
                />
                <hr class="text-[#e8e8e8]">
              </div>
              <div v-if="waitForComfirm.totalItem >=1" class="flex justify-center my-2">
                <a-pagination v-model="currentComfirm" :total="waitForComfirm.pages*8" show-less-items :page-size="8" @change="onChangeComfirm" />
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="GIAO DỊCH THÀNH CÔNG">
              <div v-if="itemSuccessful.totalItem<1" class="flex justify-center">
                <p class="text-black font-medium sm:text-xl mx-0 my-10">
                  Bạn chưa có đơn hàng thành công nào!
                </p>
              </div>
              <div v-for="(item,index) in itemSuccessful.listOrder" :key="index" class="mb-4">
                <ItemOrder
                  :item-order="item"
                  :status="item.status"
                  :cancel="item.cancel"
                />
                <hr class="text-[#e8e8e8]">
              </div>
              <div v-if="itemSuccessful.totalItem>=1" class="flex justify-center my-2">
                <a-pagination v-model="currentSuccess" :total="itemSuccessful.pages*8" show-less-items :page-size="8" @change="onChangeSuccess" />
              </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="ĐƠN HÀNG ĐÃ BỊ HỦY">
              <div v-if="itemCanceled.totalItem<1" class="flex justify-center">
                <p class="text-black font-medium sm:text-xl mx-0 my-10">
                  Không có đơn hàng nào bị hủy!
                </p>
              </div>
              <div v-for="(item,index) in itemCanceled.listOrder" :key="index" class="mb-4">
                <ItemOrder
                  :item-order="item"
                  :status="item.status"
                  :cancel="item.cancel"
                />
                <hr class="text-[#e8e8e8]">
              </div>
              <div v-if="itemCanceled.totalItem >=1" class="flex justify-center my-2">
                <a-pagination v-model="currentCancel" :total="itemCanceled.pages*8" show-less-items :page-size="8" @change="onChangeCancel" />
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import ItemOrder from '@/components/order/ItemOrder.vue'
export default {
  components: {
    ItemOrder
  },
  data () {
    return {
      current: 1,
      currentComfirm: 1,
      currentSuccess: 1,
      currentCancel: 1,
      allTransaction: {},
      waitForComfirm: {},
      itemSuccessful: {},
      itemCanceled: {},
      spinning: false
    }
  },
  mounted () {
    this.getAllTransaction(8, 1)
    this.getWaitForComfirm(8, 1)
    this.getSuccessful(8, 1)
    this.getCanceled(8, 1)
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    async getAllTransaction (limit, page) {
      try {
        this.spinning = true
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 0, limit, page })
        this.allTransaction = dataOrder.listOrder
        this.spinning = false

        // console.log('allTran: ', this.allTransaction)
      } catch (error) {
        this.spinning = false
        console.log(error)
      }
    },
    async getWaitForComfirm (limit, page) {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 0, status: 0, limit, page })
        this.waitForComfirm = dataOrder.listOrder
        // console.log('waitForComfirm: ', this.waitForComfirm)
      } catch (error) {
        console.log(error)
      }
    },
    async getSuccessful (limit, page) {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 0, status: 1, limit, page })
        this.itemSuccessful = dataOrder.listOrder
        // console.log('itemSuccessful: ', this.itemSuccessful)
      } catch (error) {
        console.log(error)
      }
    },
    async getCanceled (limit, page) {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 1, limit, page })
        this.itemCanceled = dataOrder.listOrder
      } catch (error) {
        console.log(error)
      }
    },
    onChangeAll (value) {
      console.log('page: ', value)
      this.getAllTransaction(8, value)
    },
    onChangeComfirm (value) {
      console.log('page: ', value)
      this.getWaitForComfirm(8, value)
    },
    onChangeSuccess (value) {
      console.log('page: ', value)
      this.getSuccessful(8, value)
    },
    onChangeCancel (value) {
      console.log('page: ', value)
      this.getCanceled(8, value)
    }
  }
}
</script>

<style lang="scss">
.tab_order{

    .ant-tabs-nav-wrap{
        @apply mt-3;
    }
    .ant-tabs-bar{
        @apply border-0
    }
    .ant-tabs-nav-scroll{
        @apply w-full flex justify-center;

    }
    .ant-tabs-nav .ant-tabs-tab-active{
        @apply text-orange;
    }
    .ant-tabs-tab{
        @apply font-semibold text-black text-[1rem] leading-6;
    }
    .ant-tabs-tab:hover {
        @apply text-orange
    }
    .ant-tabs-tab-active{
        @apply text-orange
    }
    .ant-tabs-ink-bar{
        @apply bg-orange
    }
    .ant-tabs-nav .ant-tabs-tab:hover{
        @apply text-orange
    }
}
</style>
