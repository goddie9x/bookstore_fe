import { valiQuery } from '@/assets/validators'

// eslint-disable-next-line arrow-parens
export default (axios) => ({

  getOrder (datas) {
    const query = valiQuery(datas)
    return axios.get(`/orders?${query}`).then(_ => _.data)
  },
  getOrderAdmin (datas) {
    const query = valiQuery(datas)
    return axios.get(`/orders/admin?${query}`).then(_ => _.data)
  },
  createOrder (orders) {
    return axios.post('/orders', orders)
  },
  cancelOrder (datas) {
    return axios.put('/orders', datas)
  },
  acceptStatus (datas) {
    return axios.put('/orders/admin/status', datas)
  }
})
