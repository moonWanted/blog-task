import React from 'react'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

import CommentSection from '../CommentSection'
import ContextToggle from '../ContextToggle'
import { useAppDispatch } from '../../hooks/useActions'
import { useDeletePostMutation } from '../../services/api-requests/postApi'
import { setCurrentPostId } from '../../store/slices/post'

import { Post as IPost } from '../../store/types/post'

function Post(props: { post: IPost }): JSX.Element {
  const { post } = props
  const dispatch = useAppDispatch()
  const [deletePost] = useDeletePostMutation()

  const handleSetCurrentPostId = () => dispatch(setCurrentPostId(post.id))

  const handleRemovePost = () => deletePost(post.id)

  return (
    <Card
      bg="dark"
      text="white"
      className="mb-2"
    >
      <Card.Header>
        Post by: {post.user}
        <Button
          type="button"
          className="ms-4"
          variant="secondary"
          size="sm"
          onClick={handleRemovePost}
        >
          Delete Post
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {post.content}
        </Card.Text>
      </Card.Body>
      <Card.Footer>

          <Card bg="dark">
            <Card.Header>
              <ContextToggle
                eventKey={post.id}
                callback={handleSetCurrentPostId}
              >
                Show Comments
              </ContextToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={post.id}>
              <Card.Body>
                <CommentSection postId={post.id} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

      </Card.Footer>
    </Card>
  )
}

export default Post
