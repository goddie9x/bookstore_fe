<template>
  <div class="flex flex-col user_admin">
    <v-table
      :data="newProducts"
      :hide-sort-icons="true"
      class="table_user table-hover"
      :filters="filters"
      :current-page.sync="currentPage"
      :page-size="10"
      @totalPagesChanged="totalPages = $event"
    >
      <thead slot="head" class="bg-white">
        <v-th :custom-sort="nameSort">
          Tên
        </v-th>
        <v-th :custom-sort="Image">
          Ảnh
        </v-th>
        <v-th :custom-sort="desSort">
          Mô Tả
        </v-th>
        <v-th :custom-sort="ratingSort">
          Đánh giá
        </v-th>
        <v-th :custom-sort="categorySort">
          Thể loại
        </v-th>
        <v-th :custom-sort="dateSort">
          Ngày
        </v-th>
        <v-th :custom-sort="btn">
          Hiệu chỉnh
        </v-th>
      </thead>
      <tbody slot="body" slot-scope="{displayData}">
        <!-- <td><input v-model="filters.name.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.description.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.rating.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.category.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input v-model="filters.time.value" class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>
        <td><input class="form-control w-[90%] h-8  px-2 border  border-[#ccc] my-2"></td>

        <tr v-if="displayData.length<1">
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
        </tr> -->
        <tr v-for="row in displayData" :key="row._id" :ref="'tr'+row._id" class="cursor-pointer" @click="focusTable(row)">
          <td>{{ row.name }}</td>
          <td>
            <div class="flex justify-center">
              <img :src="row.images[0]" alt="photo" class="w-11 py-[1px]">
            </div>
          </td>
          <td>
            <p class="truncate w-56" :title="row.description">
              {{ row.description }}
            </p>
          </td>
          <td>
            <!-- {{ row.rating }} -->
            <a-rate :default-value="roundHalf(row.rating)" disabled allow-half />
          </td>
          <td>
            {{ row.category }}
          </td>
          <td>{{ formatDate(row.createdAt) }}</td>
          <td>
            <button class="bg-green rounded-md px-3 py-1 text-white hover:opacity-90 " @click="showRestoreConfirm(row._id)">
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
      name: { value: '', keys: ['name'] },
      description: { value: '', keys: ['description'] },
      rating: { value: '', keys: ['rating'] },
      category: { value: '', keys: ['category'] },
      time: { value: '', keys: ['createdAt'] }
    },
    currentPage: 1,
    totalPages: 10,
    selectedRows: [],
    newProducts: []
  }),
  mounted () {
    this.getRestoreProducts()
  },
  methods: {
    showRestoreConfirm (id) {
      this.$confirm({
        title: 'Bạn có chắn xóa sản phẩm này không ?',
        okText: 'Có',
        okType: 'Nguy hiểm',
        cancelText: 'Không',
        onOk: () => {
          console.log('OK delete ID', id)
          this.selectedRows = []
          this.restoreProduct(id)
          setTimeout(() => {
            this.getRestoreProducts()
          }, 100)
          // window.location.reload()
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    async getRestoreProducts () {
      const product = await this.$api.product.getRestoreProduct()
      this.newProducts = product.products
      console.log('new products: ', this.newProducts)
    },
    async restoreProduct (_id) {
      try {
        await this.$api.product.restoreProduct(_id)
        this.$toast.success('Khôi phục sản phẩm thành công ', { timeout: 1500 })
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
    roundHalf (num) {
      return Math.round(num * 2) / 2
    },
    desSort (a, b) {
      const A = a.description
      const B = b.description
      return A.localeCompare(B)
    },
    nameSort (a, b) {
      // console.log(row.user.username.length)
      const A = a.name
      const B = b.name
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
    Image () {

    },
    ratingSort (a, b) {
      return a.rating * 10 - b.rating * 10
    },
    categorySort (a, b) {
      const A = a.category
      const B = b.category
      return A.localeCompare(B)
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
