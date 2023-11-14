<template>
  <div class="table_cart">
    <a-table
      :loading="loading"
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="wishlist"
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
            Shop: BOOKSTORE
          </nuxt-link>
          <p>Đánh giá: {{ record.product.rating }}/5</p>
        </div>
        <div class="flex flex-col sm:justify-center sm:ml-10 ">
          <div class="grid grid-cols-2">
            <div class="text-black text-[1rem] font-medium">
              <p>Price:</p>
              <p>Sold:</p>
              <p>Views:</p>
            </div>
            <div class="text-black font-[1rem] font-medium">
              <p>${{ record.product.price }}</p>
              <p>{{ record.product.sold }}</p>
              <p>
                {{ record.product.view }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="flex sm:justify-between w-1/2 mx-auto my-10 flex-col sm:flex-row">
          <button ref="checkOutWishlist" class="bg-green text-white py-2 px-2 text-[1rem] font-medium rounded-sm" disabled @click="addTocarts">
            <i class="fa-solid fa-cart-shopping" />
            Thêm vào giở hàng ({{ numberProduct }})
          </button>
          <button ref="deleteWishlist" disabled class="bg-red text-white py-2 px-2 text-[1rem] font-medium rounded-sm" @click="deleteWishlist">
            <i class="fa-solid fa-trash" />
            Xóa sản phẩm ({{ numberProduct }})
          </button>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
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
  data () {
    return {
      columns,
      numberProduct: 0,
      loading: false,
      selectedWishlistId: []
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.numberProduct = selectedRows.length
          if (selectedRows.length > 0) {
            this.$refs.checkOutWishlist.disabled = false
            this.$refs.deleteWishlist.disabled = false
          } else {
            this.$refs.checkOutWishlist.disabled = true
            this.$refs.deleteWishlist.disabled = true
          }
          this.selectedWishlistId = selectedRows
          console.log('selectedWishlistId: ', this.selectedWishlistId)
          // console.log('selectCartId', this.selectedCartId)
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        }

      }
    },
    wishlist () {
      return this.$store.getters.wishlist
    }
  },
  methods: {
    async deleteWishlist () {
      try {
        console.log('delete', this.selectedWishlistId)
        await this.$api.wishlist.deleteWishlist({ wishlistId: this.selectedWishlistId })
        this.$store.dispatch('dataWishlist')
        this.$toast.success('Remove product from wishlist successfully', { timeout: 1500 })
      } catch (error) {
        console.log(error)
        this.$toast.error('System error', { timeout: 1500 })
      }
    },
    async addTocarts () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        console.log('wishlist: ', this.selectedWishlistId)
        console.log(userData)
        let cart
        for (let item = 0; item < this.selectedWishlistId.length; item++) {
          cart = {
            user: userData.data._id,
            product: this.selectedWishlistId[item].product._id,
            quantity: 1,
            size: 'L'
          }
          await this.$api.cart.addToCart(cart)
          await this.$api.wishlist.deleteWishlist({ wishlistId: this.selectedWishlistId[item]._id })
          // console.log('add wishlist to cart', cart)
        }
        this.$toast.success(`Thêm ${this.selectedWishlistId.length} vào giỏ hàng thành công `, { timeout: 1500 })
        this.$store.dispatch('dataCart')
        this.$store.dispatch('dataWishlist')
      } catch (error) {
        console.log(error)
      }
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
