import supertest from 'supertest'
import buildServer from '../server'
import sequelize from '../db'

const app = buildServer()

describe('post', () => {
  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync()
  });

  let postId

  describe('get all posts', () => {
    it('should return array', async () => {
      const response = await supertest(app).get('/api/post').expect(200)
      expect(response.body).toBeInstanceOf(Array)
    });
  })

  describe('create post', () => {
    it('should return created post', async () => {
      const response = await supertest(app).post('/api/post').send({
        user: 'test',
        content: 'test'
      }).expect(200);
      expect(response.body.user).toBe('test')
      expect(response.body.content).toBe('test')
      postId = response.body.id
    });
  })

  describe('delete post', () => {
    it('should return deleted post', async () => {
      const response = await supertest(app).delete(`/api/post/${postId}`).expect(200)
      expect(response.body.message).toBe('Post deleted')
    });
  })
})

describe('comment', () => {
  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync()
  })

  let commentId
  let postId

  describe('create post for comment', () => {
    it('should return created post', async () => {
      const response = await supertest(app).post('/api/post').send({
        user: 'test',
        content: 'test'
      }).expect(200)
      expect(response.body.user).toBe('test')
      expect(response.body.content).toBe('test')
      postId = response.body.id
    });
  })

  describe('get comment for post', () => {
    it('should return array', async () => {
      const response = await supertest(app).get(`/api/comment/${postId}`).expect(200);
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('create comment', () => {
    it('should return created comment', async () => {
      const response = await supertest(app).post('/api/comment').send({
        user: 'test',
        text: 'test',
        postId: postId
      }).expect(200)
      expect(response.body.user).toBe('test')
      expect(response.body.text).toBe('test')
      expect(response.body.postId).toBe(postId)
      commentId = response.body.id
    })
  })

  describe('delete comment', () => {
    it('should return deleted comment', async () => {
      const response = await supertest(app).delete(`/api/comment/${commentId}`).expect(200)
      expect(response.body.message).toBe('Comment deleted')
    })
  })

})

