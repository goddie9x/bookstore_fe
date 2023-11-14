// eslint-disable-next-line arrow-parens
export default (axios) => ({
  sendContact (data) {
    return axios.post('/contacts/user', data)
  },
  getContact () {
    return axios.get('/contacts/admin')
  },
  deleteContact (contactId) {
    return axios.delete('/contacts', {
      data: contactId
    })
  }
})
