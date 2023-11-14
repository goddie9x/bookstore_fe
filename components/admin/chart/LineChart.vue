<template>
  <client-only placeholder="Loading...">
    <LineChart
      :chart-data="lineDataViews"
      :height="450"
      :width="700"
      chart-id="lineChart"
    />
  </client-only>
</template>
<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      lineDataViews: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'DANH SỐ',
            data: [],
            backgroundColor: 'rgba(30, 12, 211, 0.75)',
            borderColor: 'rgba(10, 155, 0, 1)',
            borderWidth: 1
          }
        ]
      }
    }
  },
  mounted () {
    this.getStatisMonth()
  },
  methods: {
    async getStatisMonth () {
      const dataMonth = await this.$api.statistical.getStatisticallMonth()
      const listTotalMonth = dataMonth.data.monthlyRevenue

      this.lineDataViews.datasets[0].data = listTotalMonth.map(item => item.sum)
      // console.log('dataMonth:', this.lineDataViews.datasets.data)
    }
  }
}
</script>
