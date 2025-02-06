const { response } = require('express');
const {
    InvalidTokenError,
    UnauthorizedError,
    InsufficientScopeError,
} = require('express-oauth2-jwt-bearer')

const errorHandler = (error, req, res, next) => {
    if (error instanceof InsufficientScopeError) {
        const message = "Permission denied"

        res.status(error.status).json({ message })

        return;
    }

    if (error instanceof InvalidTokenError) {
        const message = "Bad credentials"

        res.status(error.status).json({ message })

        return;
    }

    if (error instanceof UnauthorizedError) {
        const message = "Unauthorized"

        res.status(error.status).json({ message })

        return;
    }

    const status = 500
    const message = "Internal server error"

    res.status(status).json({ message })
}

module.exports = {
    errorHandler,
}