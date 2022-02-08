const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'GET Hello' })
})

router.post('/', (req, res) => {
    res.status(200).json({ message: 'POST Hello' })
})

router.put('/:id', (req, res) => {
    res.status(200).json({ message: `PUT Hello ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `DELETE Hello ${req.params.id}` })
})

module.exports = router