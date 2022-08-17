import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'

import Post from './components/Post/index'
import CreatePostModal from './components/CreatePostModal'
import { setCommentsList } from './store/slices/comment'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useAppDispatch } from './hooks/useActions'
import { useGetPostsQuery, useCreatePostMutation } from './services/api-requests/postApi'
import { useGetCommentsQuery } from './services/api-requests/commentApi'

function App() {
  const dispatch = useAppDispatch()
  const { currentPostId } = useTypedSelector((state) => state.post)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [createPost] = useCreatePostMutation()

  // @ts-ignore
  const { data: posts } = useGetPostsQuery()
  const { data: comments } = useGetCommentsQuery(currentPostId, {
    skip: !currentPostId
  })

  useEffect(() => {
    if (comments) {
      dispatch(setCommentsList(comments))
    }
  }, [comments, dispatch])

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const handlePostCreate = async (user: string, content: string) => {
    await createPost({
      user,
      content
    })
  }

  return (
    <div className="App">
      <Container className="mt-4" fluid="md">
        <div className="d-flex justify-content-center">
          <Button
            variant="secondary"
            className="mb-2"
            onClick={handleShow}
          >
            Create Post
          </Button>
        </div>

        <Row>
          <Col>
            <Accordion defaultActiveKey="-1">
            {posts && posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
            </Accordion>
          </Col>
        </Row>
      </Container>

      <CreatePostModal show={showModal} handleClose={handleClose} createPost={handlePostCreate} />
    </div>
  )
}

export default App
