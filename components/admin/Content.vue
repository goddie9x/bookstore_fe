<template>
  <div class="flex flex-col flex-wrap sm:flex-row">
    <div class="w-full md:w-4/12 pr-2 mb-6">
      <div class="shadow rounded-2xl p-4 bg-white dark:bg-[#1F2937]">
        <div class="flex items-center">
          <span class="rounded-xl relative p-4 bg-[#E9D5FF]">
            <svg
              width="40"
              fill="currentColor"
              height="40"
              class="
                text-purple-500
                h-4
                absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2 -translate-y-1/2
              "
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"
              />
            </svg>
          </span>
          <p class="text-md text-black dark:text-white ml-2">
            {{ title || 'TỔNG LỢI NHUẬN' }}
          </p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="
              text-gray-700
              dark:text-gray-100
              text-4xl text-left
              font-bold
              my-4
            "
          >
            {{ totalStatis.gains.totalGainsYear }}
            <span class="text-sm"></span>
          </p>
          <div class="flex items-center text-green-500 text-sm">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"
              />
            </svg>
            <span>{{ totalStatis.gains.growthGain }}%</span>
            <span class="text-gray-400"> So với năm trước</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-4/12 pr-2 mb-6">
      <div class="shadow rounded-2xl p-4 bg-white dark:bg-gray-800">
        <div class="flex items-center">
          <span class="rounded-xl relative p-4 bg-purple-200">
            <svg
              width="40"
              fill="currentColor"
              height="40"
              class="
                text-purple-500
                h-4
                absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2 -translate-y-1/2
              "
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"
              />
            </svg>
          </span>
          <p class="text-md text-black dark:text-white ml-2">
            DANH THU NĂM
          </p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="
              text-gray-700
              dark:text-gray-100
              text-4xl text-left
              font-bold
              my-4
            "
          >
            {{ totalStatis.totalYear.year }}
            <span class="text-sm">$</span>
          </p>
          <div class="flex items-center text-green-500 text-sm">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"
              />
            </svg>
            <span>{{ totalStatis.totalYear.growthYear }}%</span>
            <span class="text-gray-400">' So với năm trước'</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-4/12">
      <div class="shadow rounded-2xl p-4 bg-white dark:bg-gray-800">
        <div class="flex items-center">
          <span class="rounded-xl relative p-4 bg-purple-200">
            <svg
              width="40"
              fill="currentColor"
              height="40"
              class="
                text-purple-500
                h-4
                absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2 -translate-y-1/2
              "
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"
              />
            </svg>
          </span>
          <p class="text-md text-black dark:text-white md:ml-4">
            DANH THU THÁNG
          </p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="
              text-gray-700
              dark:text-gray-100
              text-4xl text-left
              font-bold
              my-4
            "
          >
            {{ totalStatis.totalMonth.month }}
            <span class="text-sm"></span>
          </p>
          <div class="flex items-center text-green-500 text-sm">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"
              />
            </svg>
            <span>{{ totalStatis.totalMonth.growth }}%</span>
            <span class="text-gray-400"> So với tháng trước</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-center my-10 space-x-4">
      <div class="flex flex-col justify-center text-center">
        <pie-chart class="mt-1" />
        <p class="text-black font-medium text-lg mt-4">
          Bảng thống kê sản phẩm theo danh mục
        </p>
      </div>
      <div class="flex flex-col justify-center text-center">
        <line-chart />
        <p class="text-black font-medium text-lg mt-2">
          Thống kê doanh thu hàng tháng của cửa hàng năm nay
        </p>
      </div>
    </div>
    <div class="space-x-4 flex w-full px-1 mb-8">
      <div
        class="
        shadow-lg
          rounded-xl
          w-full
          md:w-4/12
          mt-8
          p-4
          bg-white
          dark:bg-gray-800
          relative
          overflow-hidden
        "
      >
        <p
          class="
            text-gray-600
            dark:text-white
            text-xl
            mb-6
          "
        >
          SẢN PHẨM BÁN CHẠY NHẤT
        </p>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="(item) in listProduct" :key="item._id" class="flex flex-col items-center">
            <div class="relative">
              <a href="#" class="block relative">
                <img
                  alt="product"
                  :src="item.images[0]"
                  class="mx-auto object-cover rounded-full h-10 w-10"
                  :title="item.name"
                >
              </a>
              <svg
                width="10"
                height="10"
                fill="currentColor"
                class="
                  fill-current
                  text-white
                  bg-blue-600
                  rounded-full
                  p-1
                  absolute
                  bottom-0
                  right-0
                  w-4
                  h-4
                  -mx-1
                  -my-1
                "
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"
                />
              </svg>
            </div>
            <span class="text-gray-600 dark:text-gray-400 text-xs mt-2 truncate w-14" :title="item.name">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="
          shadow-lg
          rounded-xl
          w-full
          md:w-4/12
          mt-8
          p-4
          bg-white
          dark:bg-gray-800
          text-gray-700
          relative
          overflow-hidden
        "
      >
        <a href="#" class="w-full h-full block">
          <div class="w-full">
            <p class="text-gray-700 dark:text-white text-2xl  mb-4">
              XẾP HẠNG
            </p>
            <div v-for="item in listProductRating" :key="item._id">

              <div class="flex items-center justify-between text-gray-400 text-sm">
                <p>{{ item.name }}</p>
                <a-rate :default-value="roundHalf(item.rating)" disabled allow-half />
                <!-- <p>{{ item.rating }}/5</p> -->
              </div>
              <div class="w-full h-2 bg-green-100 rounded-full mb-4">
                <div
                  class="
                    w-1/3
                    h-full
                    text-center text-xs text-white
                    bg-green-400
                    rounded-full
                  "
                />
              </div>
            </div>
          </div>
        </a>
      </div>

      <div
        class="
          shadow-lg
          rounded-xl
          w-full
          md:w-4/12
          mt-8
          p-4
          bg-white
          dark:bg-gray-800
          relative
          overflow-hidden
        "
      >
        <div class="w-full flex items-center justify-between mb-8">
          <p class="text-gray-800 dark:text-white text-xl">
            XẾP HẠNG TÀI KHOẢN
          </p>
          <a
            href="/admin/users"
            class="
              flex
              items-center
              text-sm
              hover:text-gray-600
              dark:text-gray-50 dark:hover:text-white
              text-gray-300
              border-0
              focus:outline-none
            "
          >
            XEM TẤT CẢ
          </a>
        </div>
        <div v-for="(item,index) in topUser" :key="index" class="flex items-center mb-6 rounded justify-between">
          <span class="rounded-lg">
            <img :src="item.avatar" alt="avatar" class="w-10 h-10 rounded">
          </span>
          <div class="flex items-center w-full justify-between">
            <div
              class="
                flex
                text-sm
                flex-col
                w-full
                ml-2
                items-start
                justify-between
              "
            >
              <p class="dark:text-white">
                {{ item.username }}
              </p>
              <p class="text-gray-300">
                TỔNG SỐ TIỀN MUA
              </p>
            </div>
            <span class="text-green-400">+${{ item.sum }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './chart/LineChart.vue'
import PieChart from './chart/PieChart.vue'
export default {
  name: 'Content',
  components: {
    LineChart,
    PieChart
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      totalStatis: {
        total: 0,
        gains: {
          growthGain: 0,
          totalGainsYear: 0,
          totalGainsLastYear: 0
        },
        totalMonth: {
          month: 0,
          lastMonth: 0,
          growth: 0
        },
        totalYear: {
          year: 0,
          lastYear: 0,
          growthYear: 0
        }
      },
      topUser: [],
      listProduct: [],
      listProductRating: []
    }
  },
  mounted () {
    this.getStatistical()
    this.getTopUser()
    this.getTopProduct()
    this.getTopProductRating()
  },
  methods: {
    roundHalf (num) {
      return Math.round(num * 2) / 2
    },
    async getStatistical () {
      try {
        const dataStatis = await this.$api.statistical.getStatisticalAdmin()
        this.totalStatis = dataStatis.data.statisTotal
        console.log('toltal: ', this.totalStatis)
      } catch (err) {
        this.$toast.error('Error', { timeout: 1500 })
      }
    },
    async getTopUser () {
      try {
        const dataUser = await this.$api.statistical.getTopUser()
        this.topUser = dataUser.data.topUser.slice(0, 3)
      } catch (err) {
        this.$toast.error('Error', { timeout: 1500 })
      }
    },
    async getTopProduct () {
      try {
        const dataProduct = await this.$api.product.searchProduct({ search: '', page: 1, limit: 6, sort: '-sold' })
        this.listProduct = dataProduct.products.products
        console.log('list: ', this.listProduct)
      } catch (error) {
        console.log(error)
      }
    },
    async getTopProductRating () {
      try {
        const dataProduct = await this.$api.product.searchProduct({ search: '', page: 1, limit: 4, sort: '-rating' })
        this.listProductRating = dataProduct.products.products
        // console.log('list: ', this.listProduct)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
