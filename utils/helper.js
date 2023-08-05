const response = (message, data = null, success = true) => ({
  message,
  data,
  success
})

module.exports = {
  response
}