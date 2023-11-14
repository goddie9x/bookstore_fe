/* eslint-disable arrow-parens */
export default (axios) => ({
  getStatisticalAdmin () {
    return axios.get('/statistical/admin')
  },
  getTopUser () {
    return axios.get('/statistical/admin/user')
  },
  getStatisticallMonth () {
    return axios.get('/statistical/admin/month')
  },
  getCategoryByProduct () {
    return axios.get('/statistical/admin/category')
  },
  getStatisticalUser (userId) {
    return axios.get(`/statistical/user/${userId}`)
  }
})
