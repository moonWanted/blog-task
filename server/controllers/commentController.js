const { Comment } = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentController {

    async create(req, res, next) {
      const { user, text, postId, responseId } = req.body
      if (!user || !text || !postId) {
        return next(ApiError.badRequest('Missing user, text or post ID'))
      }
      try {
        const comment = await Comment.create({ user, text, postId, responseId })
        return res.json(comment)
      } catch (e) {
        return next(ApiError.internal(e.message))
      }
    }

    async getAllByPostId(req, res, next) {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest('Missing post ID'))
      }
      try {
        const comments = await Comment.findAll({ where: { postId: id } })
        return res.json(comments)
      } catch (e) {
        return next(ApiError.internal(e.message))
      }
    }

    async removeById(req, res, next) {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest('Missing comment ID'))
      }
      try {
        const comment = await Comment.findByPk(id)
        if (!comment) {
          return next(ApiError.badRequest('Comment not found'))
        }
        await comment.destroy()
        return res.json({ message: 'Comment deleted' })
      } catch (e) {
        return next(ApiError.internal(e.message))
      }
    }
}

module.exports = new CommentController()