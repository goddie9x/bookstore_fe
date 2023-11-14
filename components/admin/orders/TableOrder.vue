<template>
  <div class="flex flex-col order_admin">
    <v-table
      :data="order"
      :hide-sort-icons="true"
      class="table_admin table-hover"
      :filters="filters"
      :current-page.sync="currentPage"
      :page-size="10"
      @totalPagesChanged="totalPages = $event"
    >
      <thead slot="head" class="bg-white">
        <v-th :custom-sort="userSort">
          Tài khoảng
        </v-th>
        <v-th :custom-sort="nameSort">
          Họ và tên
        </v-th>
        <v-th :custom-sort="deliveryLength">
          Dịa chỉ giao hàng
        </v-th>
        <v-th :custom-sort="phoneLength">
          Số  ĐT
        </v-th>
        <v-th :custom-sort="dateSort">
          Thời gian đặt hàng
        </v-th>
        <v-th :custom-sort="statusSort">
          Trạng thái
        </v-th>
      </thead>
      <tbody slot="body" slot-scope="{displayData}">
        <!-- <td><input v-model="filters.username.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.fullName.value" class="form-control w-[90%] h-8  px-2 border border-[#ccc] my-2"></td>
        <td><input v-model="filters.deliveryAddress.value" class="form-control w-[90%] h-8  px-2 border border-[#ccc] my-2"></td>
        <td><input v-model="filters.phoneNumber.value" class="form-control w-[90%] h-8  px-2 border border-[#ccc] my-2"></td>
        <td><input v-model="filters.time.value" class="form-control w-[90%] h-8  px-2 border border-[#ccc] my-2"></td>
        <td><input v-model="filters.status.value" class="form-control w-[90%] h-8  px-2 border border-[#ccc] my-2"></td>

        <tr v-if="displayData.length<1">
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
        </tr> -->
        <tr v-for="row in displayData" :key="row._id" :ref="'tr'+row._id" class="cursor-pointer" @click="focusTable(row)">
          <td>{{ row.user.username }}</td>
          <td>{{ row.fullName }}</td>
          <td>{{ row.deliveryAddress }}</td>
          <td>{{ row.phoneNumber }}</td>
          <td>{{ formatDate(row.createdAt) }}</td>
          <td class="flex justify-between">
            <div class="">
              <span v-if="row.status===false" class=" text-black rounded-sm text-[0.8rem] px-1" :class="row.cancel===true? 'bg-grey_dark': 'bg-pink_hover'">
                Chờ xác nhận
              </span>
              <span v-else class="bg-green text-black rounded-sm text-[0.8rem] px-1">
                Đặt hàng thành công
              </span>
            </div>
            <button ref="btn_showdetails" class=" font-medium text-[1rem] bg-blue rounded-md py-1 px-2 hover:opacity-80 mr-2 text-white" @click.stop="showDetail(row)">
              Xem
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="pagination_ui flex justify-center mt-4">
      <smart-pagination
        :current-page.sync="currentPage"
        :total-pages="totalPages"
      />
    </div>
    <ModalDetail ref="modalDetail" :item-order="itemOrder" :comfirm="comfirm" />
  </div>
</template>

<script>
import moment from 'moment'
import ModalDetail from './ModalDetail.vue'

export default {
  components: {
    ModalDetail
  },
  // name: 'Sorting',
  props: {
    order: {
      type: Array,
      default: () => []
    },

    comfirm: {
      type: Boolean
    }
    // eslint-disable-next-line vue/require-default-prop

  },
  data: () => ({
    filters: {
      username: { value: '', keys: ['user.username'] },
      fullName: { value: '', keys: ['fullName'] },
      totalPrice: { value: '', keys: ['totalPrice'] },
      phoneNumber: { value: '', keys: ['phoneNumber'] },
      deliveryAddress: { value: '', keys: ['deliveryAddress'] },
      time: { value: '', keys: ['createdAt'] },
      status: { value: '', keys: ['status'] }
    },
    // isShow: this.$refs.modalDetail.visible,
    currentPage: 1,
    totalPages: 10,
    selectedRows: [],
    itemOrder: {}
  }),
  methods: {
    showDetail (row) {
      this.itemOrder = row
      const trId = row._id
      this.$refs.modalDetail.showModal()
      const lateId = this.selectedRows._id
      if (lateId) {
        this.$refs[`tr${lateId}`][0].classList.remove('table-info')
      }
      // console.log('btn_show', this.$refs.btn_showdetails[0])
      // console.log('tr', this.$refs[`tr${trId}`])
      // this.$refs[`tr${trId}`].style.color = 'red'
      this.$refs[`tr${trId}`][0].classList.add('table-info')
      this.selectedRows = row
      console.log('row: ', this.selectedRows)
    },
    focusTable (row) {
      const trId = row._id
      const lateId = this.selectedRows._id
      if (lateId) {
        this.$refs[`tr${lateId}`][0].classList.remove('table-info')
      }
      this.$refs[`tr${trId}`][0].classList.add('table-info')
      this.selectedRows = row
      console.log('row: ', this.selectedRows)
    },
    deliveryLength (row) {
      return row.deliveryAddress.length
    },
    phoneLength (row) {
      return row.phoneNumber.length
    },
    nameSort (a, b) {
      const A = a.fullName
      const B = b.fullName
      return A.localeCompare(B)
    },
    userSort (a, b) {
      // console.log(row.user.username.length)
      const A = a.user.username
      const B = b.user.username
      return A.localeCompare(B)
    },
    addressLength (row) {
      return row.deliveryAddress.length
    },
    formatDate (a) {
      return moment(a).format('YYYY-MM-DD hh:mm')
    },

    dateSort (a, b) {
      const A = moment(a.createdAt).format('YYYY/MM/DD')
      const B = moment(b.createdAt).format('YYYY/MM/DD')
      const date1 = new Date(A).getTime()
      const date2 = new Date(B).getTime()

      return date1 - date2
    },
    statusSort (a, b) {

    }
  }
}
</script>

<style lang="scss">
  .vt-sort:before{
    font-family: FontAwesome;
    padding-right: 0.5em;
    width: 1.28571429em;
    display: inline-block;
    text-align: center;
}

.vt-sortable:before{
    content: "\f0dc";
}

.vt-asc:before{
    content: "\f160";
}

.vt-desc:before{
    content: "\f161";
}
.table_admin{
  @apply border border-[#ccc] text-black;
  th,td{
    @apply h-10 border-t border-b border-[#ccc]
  }
  th,td{
    @apply text-center bg-white
  }
}
.table-info{
  td{

    @apply bg-[#abdde5]
  }
}
.order_admin{

  tr:hover{
    td{
    @apply bg-[#d9ebed]
    }
  }
}
.pagination_ui{
  .pagination{
      @apply flex space-x-2 ;
      .page-item{
        @apply w-[32px] h-8 border rounded-sm text-center items-center justify-center flex font-medium ;
      }
      .page-item:hover{

      }
      .active{
          @apply bg-[#007bff] text-white border-[#007bff]
      }
  }
}
</style>
