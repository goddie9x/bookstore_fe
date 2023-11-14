<!-- <template>
  <div class="flex flex-cols w-full">
    <div class="tab_order-admin w-full">
      <a-tabs default-active-key="2a" class="max-w-[50%]" @change="callback">
        <a-tab-pane key="1" tab="Wait For Confirmation">
          <div v-if="waitForComfirm.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              There are no bills waiting
            </p>
          </div>
          <TableOrder
            :order="waitForComfirm.listOrder"
            :comfirm="true"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Successful Delivery">
          <div v-if="itemSuccessful.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              You have not had any successful orders yet
            </p>
          </div>
          <TableOrder
            :order="itemSuccessful.listOrder"
          />
          <div v-if="itemSuccessful.totalItem>=1" class="flex justify-center">
            <a-pagination v-model="currentSuccess" :total="itemSuccessful.pages*8" show-less-items :page-size="8" @change="onChangeSuccess" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Order Canceled">
          <div v-if="itemCanceled.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              No orders have been canceled
            </p>
          </div>

          <TableOrder
            :order="itemCanceled.listOrder"
          />
          <div v-if="itemCanceled.totalItem >=1" class="flex justify-center">
            <a-pagination v-model="currentCancel" :total="itemCanceled.pages*8" show-less-items :page-size="8" @change="onChangeCancel" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template> -->
<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " :class="{'text-[#db2777] hover:text-[#db2777] bg-white': openTab !== 1, 'text-white hover:text-white bg-[#db2777]': openTab === 1}" @click="toggleTabs(1)">
            CHỜ XÁC NHẬN
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-[#db2777]  hover:text-[#db2777] bg-white': openTab !== 2, 'text-white  hover:text-white bg-[#db2777]': openTab === 2}" @click="toggleTabs(2)">
            ĐƠN HÀNG THÀNH CÔNG
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" :class="{'text-[#db2777] hover:text-[#db2777] bg-white': openTab !== 3, 'text-white hover:text-white bg-[#db2777]': openTab === 3}" @click="toggleTabs(3)">
            HỦY ĐƠN
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <TableOrder
                :order="waitForComfirm.listOrder"
                :comfirm="true"
              />
            </div>
            <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <TableOrder
                :order="itemSuccessful.listOrder"
              />
            </div>
            <div :class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <TableOrder
                :order="itemCanceled.listOrder"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableOrder from '@/components/admin/orders/TableOrder.vue'
export default {
  components: {
    TableOrder

  },
  data () {
    return {
      openTab: 1,
      current: 1,
      currentComfirm: 1,
      currentSuccess: 1,
      currentCancel: 1,
      allTransaction: {},
      waitForComfirm: {},
      itemSuccessful: {},
      itemCanceled: {}
    }
  },
  mounted () {
    // this.getAllTransaction(8, 1)
    this.getWaitForComfirm(100, 1)
    this.getSuccessful(100, 1)
    this.getCanceled(100, 1)
  },
  methods: {
    toggleTabs (tabNumber) {
      this.openTab = tabNumber
    },
    callback (key) {
      console.log(key)
    },
    // async getAllTransaction (limit, page) {
    //   try {
    //     const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 0, limit, page })

    //     this.allTransaction = dataOrder.listOrder
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async getWaitForComfirm (limit, page) {
      try {
        const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 0, status: 0, limit, page })
        this.waitForComfirm = dataOrder.listOrder
        console.log(this.waitForComfirm)
      } catch (error) {
        console.log(error)
      }
    },
    async getSuccessful (limit, page) {
      try {
        const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 0, status: 1, limit, page })
        this.itemSuccessful = dataOrder.listOrder
      } catch (error) {
        console.log(error)
      }
    },
    async getCanceled (limit, page) {
      try {
        const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 1, limit, page })
        this.itemCanceled = dataOrder.listOrder
        console.log(this.itemCanceled)
      } catch (error) {
        console.log(error)
      }
    },
    // onChangeAll (value) {
    //   // getAllTransaction()
    //   console.log('page: ', value)
    //   this.getAllTransaction(8, value)
    // },
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
// .leading-normal{
//     @apply hover:text-orange
// }
</style>
