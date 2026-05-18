function success(res, message, data){
    return res.status(200).json({
        success: true,
        message,
        data
    })
}

function error(res, message, statusCode = 400){
    return res.status(statusCode).json({
        sucess: false,
        message
    })
}

module.exports = {
    success
}