export function isValidEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function isValidUserName (name) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-zA-Z][a-zA-Z\s]*$/
  return re.test(name)
}
export function isValidName (name) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
  return re.test(name)
}
export function isValidPassword (pass) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return re.test(pass)
}

export function isValidCost (price) {
  // eslint-disable-next-line no-useless-escape
  const re = /^\d+(\.\d{2})?$/
  return re.test(price)
}
export function isValidPhone (phone) {
  // eslint-disable-next-line no-useless-escape
  const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

  return re.test(phone)
}

// map object thanh key=value

export function valiQuery (query) {
  return Object.entries(query)
    .map(([key, value]) =>
          `${key}=${value}`
    )
    .join('&')
}
