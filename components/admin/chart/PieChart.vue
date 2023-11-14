<template>
  <client-only placeholder="Loading...">
    <DoughnutChart
      :chart-data="doughChartData"
      :chart-options="doughChartOptions"
      :height="430"
    />
  </client-only>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      doughChartData: {
        labels: ['NuVue', 'VueJit', 'IftShi', 'KoinVi', 'MegsWear', 'Millgh'],
        datasets: [
          {
            label: 'Visualization',
            data: [72, 131, 12, 3, 4, 55],
            backgroundColor: [
              'rgba(20, 255, 0, 0.85)',
              'rgba(200, 5, 0, 0.85)',
              'rgba(10, 220, 0, 0.85)',
              'rgba(106, 218, 253,0.9)',
              'rgba(255, 165, 0,0.9)',
              'rgba(2, 100, 0, 0.85)',
              'rgb(255, 196, 255)',
              'rgba(20, 55, 0, 0.85)',
              'rgba(120, 155, 0, 0.85)'
            ],
            borderColor: 'rgba(100, 155, 0, 1)',
            borderWidth: 0
          }
        ]
      },
      doughChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        offset: 8,
        radius: 160,
        spacing: 4,
        hoverOffset: 32,
        hoverBorderWidth: 1,
        weight: 0
      }
    }
  },
  mounted () {
    this.getCategoryByProduct()
  },
  methods: {
    async getCategoryByProduct () {
      const restData = await this.$api.statistical.getCategoryByProduct()
      this.doughChartData.labels = restData.data.numberCategory.map(item => item.category)
      this.doughChartData.datasets[0].data = restData.data.numberCategory.map(item => item.sum)
    }
  }
}
</script>
