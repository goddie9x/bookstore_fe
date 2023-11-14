// eslint-disable-next-line arrow-parens
export default (axios) => ({

  signin (email, password) {
    return axios.post('/users/signin', { email, password })
  },
  signup (username, email, password) {
    return axios.post('/users/signup', { username, email, password })
  },
  secret (authorization) {
    return axios.get('/users/secret', {
      headers: {
        authorization: 'Bearer ' + authorization
      }
    })
  }
})
