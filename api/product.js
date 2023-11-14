import { valiQuery } from '@/assets/validators'
// eslint-disable-next-line arrow-parens
export default (axios) => ({
  addProduct (form) {
    return axios.post('/products', form)
  },
  searchProduct (datas) {
    const query = valiQuery(datas)
    return axios.get(`/products/?${query}`).then(_ => _.data)
  },
  getProductId (productId) {
    return axios.get(`/products/${productId}`)
  },
  getRestoreProduct () {
    return axios.get('/products/product/bin').then(_ => _.data)
  },
  deleteProduct (_id) {
    return axios.delete('/products', { data: { _id } })
  },
  restoreProduct (_id) {
    return axios.put('/products/restore', { _id })
  },
  editProduct (data) {
    return axios.put('/products/edit', data)
  }
})
