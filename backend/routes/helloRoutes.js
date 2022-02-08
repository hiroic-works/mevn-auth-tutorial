const express = require('express')
const router = express.Router()
const {getHello, setHello, updateHello, deleteHello} = require('../controllers/helloController')

router.get('/', getHello)

router.post('/',setHello)

router.put('/:id', updateHello)

router.delete('/:id', deleteHello)

module.exports = router