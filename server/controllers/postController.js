const { Post, Comment } = require('../models/models')
const ApiError = require('../error/ApiError')

class PostController {

  async create(req, res, next) {
    const { user, content } = req.body
    if (!user || !content) {
      return next(ApiError.badRequest('Missing user or content'))
    }
    if(typeof content !== 'string') {
      return next(ApiError.badRequest('Content must be a string'))
    }
    if(typeof user !== 'string') {
      return next(ApiError.badRequest('User must be a string'))
    }
    try {
      const post = await Post.create({ user, content })
      return res.json(post)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }

  }

  async getAll(req, res, next) {
    try {
      const posts = await Post.findAll(
        {
          order: [['updatedAt', 'DESC']]
        }
      )
      return res.json(posts)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async removeById(req, res, next) {
    const { id } = req.params
    if (!id) {
      return next(ApiError.badRequest('Missing post ID'))
    }
    try {
      const post = await Post.findByPk(id)
      const comments = await Comment.findAll({ where: { postId: id } })
      if (!post) {
        return next(ApiError.badRequest('Post not found'))
      }
      await post.destroy()
      await comments.forEach(async (comment) => {
        await comment.destroy()
      })
      return res.json({ message: 'Post deleted' })
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new PostController()