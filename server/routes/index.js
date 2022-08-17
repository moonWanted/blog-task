import Router from 'express'
import postRouter from './postRouter.js'
import commentRouter from './commentRouter.js'

const router = new Router()

router.use('/post', postRouter)
router.use('/comment', commentRouter)

export default router