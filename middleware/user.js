export default function ({ redirect }) {
  const resData = JSON.parse(localStorage.getItem('info'))
  // const isAdmin = false

  if (resData) {
    console.log('Logged')
  } else {
    console.log('You can not access this page')
    return redirect('/error')
  }
}
