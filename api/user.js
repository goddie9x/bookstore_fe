// eslint-disable-next-line arrow-parens
export default (axios) => ({
  getUser () {
    return axios.get('/users').then(_ => _.data)
  },
  deleteUser (_id) {
    return axios.delete('/users', {
      data: _id
    })
  },
  getUserBin () {
    return axios.get('/users/bin').then(_ => _.data)
  },
  restoreUser (_id) {
    return axios.put('/users/restore', { _id })
  },
  resetPass (data) {
    return axios.post('/users/reset', data)
  },
  editAvatar (userId, data) {
    return axios.put(`/users/${userId}`, data)
  },
  sendOtp (email) {
    return axios.post('/users/forgot/otp', email)
  },
  forgotPass (data) {
    return axios.post('/users/forgot/newpass', data)
  }
})
