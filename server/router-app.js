const express = require('express')
const controller = require('./controller')
const router = express.Router();

router.get('/nasaimage', controller.getImage);
router.get('/user/:id', controller.getUser);
router.post('/user', controller.createUser);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.deleteUser)

module.exports = router;


