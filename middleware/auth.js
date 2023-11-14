export default function ({ redirect }) {
  const resData = JSON.parse(localStorage.getItem('info'))
  // const isAdmin = false

  if (resData && resData.admin) {
    // alert('bạn là admin')
    console.log('Admin')
  } else {
    console.log('You can not access this page')
    return redirect('/error')
  }
}
