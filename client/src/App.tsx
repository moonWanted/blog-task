import React, { useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Post from './components/Post/index'
import CreatePostModal from './components/CreatePostModal/index'
import { getPosts, createPost } from './services/api-requests/posts'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from './store/slices/post'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useAppDispatch } from './hooks/useActions'

function App() {
  const dispatch = useAppDispatch()
  const { list } = useTypedSelector((state) => state.post)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handlePostCreate = (user: string, content: string) => {
    createPost(user, content)
      .then(() => {
        handlePostsFetch()
      })
  }

  const handlePostsFetch = () => {
    dispatch(fetchPosts())
    getPosts()
      .then(posts => {
        dispatch(fetchPostsSuccess(posts))
      })
      .catch(error => {
        dispatch(fetchPostsFailure(error))
      })
  }

  useEffect(() => {
    handlePostsFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {list.map(post => (
              <Post key={post.id} post={post} handlePostsFetch={handlePostsFetch} />
            ))}
          </Col>
        </Row>
      </Container>

      <CreatePostModal show={showModal} handleClose={handleClose} createPost={handlePostCreate} />
    </div>
  );
}

export default App;
