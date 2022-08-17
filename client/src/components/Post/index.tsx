import React from 'react'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

import CommentSection from '../CommentSection'
import ContextToggle from '../ContextToggle'
import { useAppDispatch } from '../../hooks/useActions'
import { fetchCommentsById, fetchCommentsByIdFailure, fetchCommentsByIdSuccess} from '../../store/slices/comment';
import { getCommentsById } from '../../services/api-requests/comments'
import { removePost } from '../../services/api-requests/posts'

import { Post as IPost } from '../../store/types/post'

function Post(props: { post: IPost, handlePostsFetch: () => void }): JSX.Element {
  const { post, handlePostsFetch } = props
  const dispatch = useAppDispatch()

  const handleFetchComments = () => {
    dispatch(fetchCommentsById())
    getCommentsById(post.id)
      .then(comments => {
        dispatch(fetchCommentsByIdSuccess(comments))
      })
      .catch(error => {
        dispatch(fetchCommentsByIdFailure(error))
      })
  }

  const handleRemovePost = () => {
    removePost(post.id)
      .then(() => {
        handlePostsFetch()
      })
      .catch(error => {
        console.log(error)
      })
  }

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
        <Accordion defaultActiveKey="-1">
          <Card bg="dark">
            <Card.Header>
              <ContextToggle
                eventKey="0"
                callback={() => handleFetchComments()}
              >
                Show Comments
              </ContextToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <CommentSection postId={post.id} handleFetchComments={handleFetchComments}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Card.Footer>
    </Card>
  );
}

export default Post
