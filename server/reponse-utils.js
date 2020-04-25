function success (res, code = 200) {
  return function _internal (data) {
    let status = 200
    if (code > 200 && code <= 208) {
      status = code
    }
    return res.status(status).json({ data })
  }
}

function error (res, error) {
  if (error && error.name === 'HttpError') {
    const { status, code, message } = error
    return res.status(status).json({
      code,
      message
    })
  }

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  })
}

module.exports = {
  success,
  error
}
