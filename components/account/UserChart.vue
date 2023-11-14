<template>
  <client-only placeholder="Loading...">
    <LineChart
      :chart-data="lineDataViews"
      :height="200"
      :width="500"
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'],
        datasets: [
          {
            label: 'Turnover',
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
    this.getStatisticalUser()
  },
  methods: {
    async getStatisticalUser () {
      const userData = JSON.parse(localStorage.getItem('info'))
      const dataMonth = await this.$api.statistical.getStatisticalUser(userData._id)
      const listTotalMonth = dataMonth.data.turnoverUserByMonth

      this.lineDataViews.datasets[0].data = listTotalMonth.map(item => item.sumTur)
      // console.log('dataMonth:', this.lineDataViews.datasets[0].data)
    }
  }
}
</script>
