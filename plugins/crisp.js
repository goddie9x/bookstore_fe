export default () => {
  window.$crisp = []
  window.CRISP_WEBSITE_ID = '30f5b01e-cecf-4b32-ad5b-8a99c24c0a8d'
  const userInfo = JSON.parse(localStorage.getItem('info'))
  if (userInfo && userInfo.admin) {
    window.$crisp.push(['do', 'chat:hide'])
  }
  if (userInfo && !userInfo.admin) {
    window.CRISP_TOKEN_ID = userInfo.username
    window.$crisp.push(['do', 'chat:show'])
  } else {
    window.$crisp.push(['do', 'session:reset'])
    window.$crisp.push(['do', 'chat:hide'])
  }

  (function () {
    const d = document
    const s = d.createElement('script')

    s.src = 'https://client.crisp.chat/l.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
  })()
}
