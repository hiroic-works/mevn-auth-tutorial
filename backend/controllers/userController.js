const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

/**
 * @desc register user
 * @route POST /api/users
 * @access Public
 */
const registerUser = (req, res) => {
    res.status(200).json({
        message: 'registerUser'
    })
}

/**
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = (req, res) => {
    res.status(200).json({
        message: 'loginUser'
    })
}

/**
 * @desc get user data
 * @route GET /api/users/me
 * @access Public
 */
const getMe = (req, res) => {
    res.status(200).json({
        message: 'my user data'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}