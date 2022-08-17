import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import ContextToggle from '../ContextToggle'
import CommentInput from '../CommentInput'

import { Comment } from '../../store/types/comment'

interface CommentCardProps {
  response: Comment;
  id: string;
  handleAddComment:(name: string, commentText: string, id: string) => void
  handleRemoveComment:(id: string) => void
}

function CommentCard(props: CommentCardProps): JSX.Element {
  const { response, handleAddComment, handleRemoveComment, id } = props

  return (
    <Card
      bg="dark"
      text="white"
    >
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {response.user}
          <Button
            variant="secondary"
            className="ms-2"
            size='sm'
            onClick={() => handleRemoveComment(id)}
          >
            Delete Comment
          </Button>
        </Card.Subtitle>
        <Card.Text>
          {response.text}
        </Card.Text>
        <Accordion defaultActiveKey="-1">
          <Card bg="dark">
            <Card.Header>
              <ContextToggle eventKey="0">Reply</ContextToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <CommentInput addComment={(name: string, commentText: string) => handleAddComment(name, commentText, response.id)} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Card.Body>
    </Card>
  )
}

export default CommentCard