function serverErrorHandler(err, request, response) {
    console.log('here')
    response.status(500).send(err)
}

module.exports = serverErrorHandler