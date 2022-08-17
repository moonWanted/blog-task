import React from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useAppDispatch } from '../../hooks/useActions'
import { createComment, removeComment } from '../../services/api-requests/comments'
import { fetchCommentsByIdFailure } from '../../store/slices/comment'

import ContextToggle from '../ContextToggle'

import { Comment } from '../../store/types/comment'

interface Props {
  postId: string;
  handleFetchComments: () => void;
}

interface CommentCardProps {
  response: Comment;
  id: string;
  handleAddComment:(name: string, commentText: string, id: string) => void
  handleRemoveComment:(id: string) => void
}

function CommentSection(props: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const { postId, handleFetchComments } = props
  const { list } = useTypedSelector((state) => state.comment)

  const handleAddComment = (name: string, comment: string, responseId?: string) => {
    createComment(name, comment, postId, responseId)
      .then(_comment => {
          handleFetchComments()
        }
      )
      .catch(error => {
        dispatch(fetchCommentsByIdFailure(error) )
      })
  }

  const handleRemoveComment = (id: string) => {
    removeComment(id)
      .then(() => {
        handleFetchComments()
      } )
      .catch(error => {
        console.log(error)
      } )
  }

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
  );
}

function CommentInput(props: {
  addComment: (name: string, comment: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}): JSX.Element {
  const [name, setName] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');

  const { addComment } = props

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addComment && addComment(name, comment)
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3 p-2" controlId="exampleForm.ControlTextarea1">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your name</Form.Label>
              <Form.Control onChange={handleNameChange} />
            </Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control value={comment} onChange={handleCommentChange} as="textarea" rows={2} />
          </Form.Group>
          <Button
            type="submit"
            variant="secondary"
            className="mb-4 ms-2"
            size='sm'
            disabled={!name || !comment}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
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

export default CommentSection