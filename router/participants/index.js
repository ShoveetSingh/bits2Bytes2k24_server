// Requiring all the packages
const express = require('express')
const router = express.Router()

// Here we are importing API methods from controller(s)
const {createUser} = require('../../controller/participants')


/* Below are example HTTPS request types and respective API methods
router.post('/createuser', createUser)
router.get('/createuser', createUser)
router.update('/createuser', createUser)
*/

router.post('/addData',createUser);

module.exports = { participantsRoutes: router };