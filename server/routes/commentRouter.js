const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')

router.post('/', commentController.create)
router.get('/:id', commentController.getAllByPostId)
router.delete('/:id', commentController.removeById)

module.exports = router