const Router = require('express')
const router = new Router()

const taskController = require('../controllers/taskController')

router.get('/get', taskController.getAll)
router.post('/create', taskController.create)
router.post('/update', taskController.update)
router.post('/delete', taskController.delete)

module.exports = router
