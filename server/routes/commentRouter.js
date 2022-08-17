import Router from 'express'
const router = new Router()
import commentController from '../controllers/commentController.js'

router.post('/', commentController.create)
router.get('/:id', commentController.getAllByPostId)
router.delete('/:id', commentController.removeById)

export default router