const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Post = sequelize.define('post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
})

const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  responseId: { type: DataTypes.INTEGER, allowNull: true },
})

const replyTo = sequelize.define('reply_to', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  commentId: { type: DataTypes.INTEGER, allowNull: false },
  responseId: { type: DataTypes.INTEGER, allowNull: false },
})

Post.hasMany(Comment, { as: 'comment' })
Comment.belongsTo(Post)

Comment.hasMany(replyTo)
replyTo.belongsTo(Comment)

module.exports = {
  Post,
  Comment,
}