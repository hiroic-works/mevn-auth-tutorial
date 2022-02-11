const express = require('express')
const router = express.Router()
const {getHello, setHello, updateHello, deleteHello} = require('../controllers/helloController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getHello)

router.post('/', protect, setHello)

router.put('/:id', protect, updateHello)

router.delete('/:id', protect, deleteHello)

module.exports = router