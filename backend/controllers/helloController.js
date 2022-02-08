/**
 * @desc get hello
 * @route GET /api/hello
 * @access Private
 */
const getHello = (req, res) => {
    res.status(200).json({ message: 'GET Hello' })
}

/**
 * @desc set hello
 * @route POST /api/hello
 * @access Private
 */
 const setHello = (req, res) => {
    res.status(200).json({ message: 'POST Hello' })
}

/**
 * @desc update hello
 * @route PUT /api/hello/:id
 * @access Private
 */
 const updateHello = (req, res) => {
    res.status(200).json({ message: `PUT Hello ${req.params.id}` })
}

/**
 * @desc delete hello
 * @route DELETE /api/hello/:id
 * @access Private
 */
 const deleteHello = (req, res) => {
    res.status(200).json({ message: `DELETE Hello ${req.params.id}` })
}


module.exports = {
    getHello,
    setHello,
    updateHello,
    deleteHello
}