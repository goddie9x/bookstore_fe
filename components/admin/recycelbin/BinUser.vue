<template>
  <div class="flex flex-col user_admin">
    <v-table
      :data="listUser"
      :hide-sort-icons="true"
      class="table_user table-hover"
      :filters="filters"
      :current-page.sync="currentPage"
      :page-size="10"
      @totalPagesChanged="totalPages = $event"
    >
      <thead slot="head" class="bg-white">
        <v-th :custom-sort="userSort">
          Tên
        </v-th>
        <v-th :custom-sort="emailSort">
          Email
        </v-th>
        <v-th :custom-sort="roleSort">
          Vai trò
        </v-th>
        <v-th :custom-sort="dateSort">
          Ngày
        </v-th>
        <v-th :custom-sort="btn">
          Hiệu chỉnh
        </v-th>
      </thead>
      <tbody slot="body" slot-scope="{displayData}">
        <!-- <td><input v-model="filters.username.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.email.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.admin.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.time.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <tr v-if="displayData.length<1">
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
        </tr> -->
        <tr v-for="row in displayData" :key="row._id" :ref="'tr'+row._id" class="cursor-pointer" @click="focusTable(row)">
          <td>{{ row.username }}</td>
          <td>{{ row.email }}</td>
          <td>
            <a-tag v-if="row.admin" color="red">
              Admin
            </a-tag>
            <a-tag v-else color="green">
              User
            </a-tag>
          </td>
          <td>{{ formatDate(row.createdAt) }}</td>
          <td>
            <button class="bg-green rounded-md px-3 py-1 text-white hover:opacity-90 " @click="showDeleteConfirm(row._id,row.username)">
              Khôi phục
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
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    filters: {
      username: { value: '', keys: ['username'] },
      email: { value: '', keys: ['email'] },
      admin: { value: '', keys: ['admin'] },
      time: { value: '', keys: ['createdAt'] }
    },
    // isShow: this.$refs.modalDetail.visible,
    currentPage: 1,
    totalPages: 10,
    selectedRows: [],
    itemOrder: {},
    listUser: []
  }),
  mounted () {
    this.getUser()
  },
  methods: {
    showDeleteConfirm (id, username) {
      this.$confirm({
        title: `Are you sure restore this user ${username} ?`,
        // content: 'Some descriptions',
        okText: 'Yes',
        okType: 'success',
        cancelText: 'No',
        onOk: () => {
          console.log('OK restore ID', id)
          this.selectedRows = []
          this.restoreUser(id)
          setTimeout(() => {
            this.getUser()
          }, 100)
          // window.location.reload()
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    async getUser () {
      try {
        const usersData = await this.$api.user.getUserBin()
        this.listUser = usersData.users
        console.log('user Data', usersData)
      } catch (error) {
        console.log(error)
      }
    },
    async restoreUser (_id) {
      try {
        console.log('call delete User', _id)
        await this.$api.user.restoreUser(_id)
        this.$toast.success('account restore successfully ', { timeout: 1500 })
      } catch (error) {
        this.$toast.error('System error', { timeout: 1500 })
      }
    },
    showDetail (row) {
      this.itemOrder = row
      const trId = row._id
      this.$refs.modalDetail.showModal()
      const lateId = this.selectedRows._id
      if (lateId) {
        this.$refs[`tr${lateId}`][0].classList.remove('table-info')
      }
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
    emailSort (a, b) {
      const A = a.email
      const B = b.email
      return A.localeCompare(B)
    },
    userSort (a, b) {
      // console.log(row.user.username.length)
      const A = a.username
      const B = b.username
      return A.localeCompare(B)
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

    },
    roleSort (a, b) {
      return a.admin - b.admin
    },
    btn () {

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
    .table_user{
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
    .user_admin{

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
