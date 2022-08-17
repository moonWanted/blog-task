import Router from 'express'
import postController from '../controllers/postController.js'

const router = new Router()

router.post('/', postController.create)
router.get('/', postController.getAll)
router.delete('/:id', postController.removeById)

export default router