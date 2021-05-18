



function errorResponse(res, status=500, message){
    res.status(status === "" ? 500 : status).json({ message: message })
}

function successResponse(res, status=200, object){
    res.status(status === "" ? 200 : status).json(object)
}

module.exports = { errorResponse, successResponse }
