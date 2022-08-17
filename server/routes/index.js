const Router = require('express')
const router = new Router()
const postRouter = require('./postRouter')
const commentRouter = require('./commentRouter')

router.use('/post', postRouter)
router.use('/comment', commentRouter)

module.exports = router