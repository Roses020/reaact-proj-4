require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') 
        //The function is checking the presence of an "Authorization" header in the request.
        //checking to see if a user is authenticated.

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }    // if there is no authorization header the function sends a 401 unauthorised.

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }//if the verify method throws an error this means the token is invalid

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        } //checks to see if the token is succesfully verified otherwise it throws an error

        next()
    }
}