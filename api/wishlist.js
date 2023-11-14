// eslint-disable-next-line arrow-parens
export default (axios) => ({
  getWishList (userId) {
    return axios.get(`/wishlist/${userId}`)
  },
  addWishList (data) {
    return axios.post('/wishlist', data)
  },
  deleteWishlist (wishlistId) {
    return axios.delete('/wishlist', {
      data: wishlistId
    })
  }
})
