const express = require('express')
const router = express.Router()

// Here we are importing API methods from controller(s)
const {createUser,loginUser} = require('../../controller/participants')
 


router.post('/addData',createUser);
router.post('/login',loginUser)

module.exports = { participantsRoutes: router}