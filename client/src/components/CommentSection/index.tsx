import React from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useCreateCommentMutation, useDeleteCommentMutation } from '../../services/api-requests/commentApi'

import CommentInput from '../CommentInput'
import CommentCard from '../CommentCard'

interface Props {
  postId: string
}

function CommentSection(props: Props): JSX.Element {
  const { postId } = props
  const { list } = useTypedSelector((state) => state.comment)
  const [createComment] = useCreateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  const handleAddComment = (name: string, comment: string, responseId?: string) => {
    createComment({user: name, text: comment, postId, responseId})
  }

  const handleRemoveComment = (id: string) => deleteComment(id)

  return (
    <Card
      bg="dark"
      text="white"
      className="mb-2"
    >
      Leave a comment:
      <CommentInput addComment={handleAddComment}/>
      <Row>
        <Col>
          <ListGroup>
            {list.map((comment) => (
              <ListGroup.Item key={comment.id} variant="secondary">
                <CommentCard
                  id={comment.id}
                  handleRemoveComment={handleRemoveComment}
                  response={{...comment}}
                  handleAddComment={(name: string, commentText: string) => handleAddComment(name, commentText, comment.id)}
                />
                {comment.responses && (
                  <ListGroup>
                    {comment.responses.map((response) => (
                      <ListGroup.Item key={response.id} variant="secondary">
                        <CommentCard
                          id={response.id}
                          handleRemoveComment={handleRemoveComment}
                          response={{...response}}
                          handleAddComment={(name: string, commentText: string) => handleAddComment(name, commentText, response.id)}
                        />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Card>
  )
}

export default CommentSection