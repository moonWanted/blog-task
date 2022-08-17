import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function CommentInput(props: {
  addComment: (name: string, comment: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}): JSX.Element {
  const [name, setName] = useState<string>('')
  const [comment, setComment] = useState<string>('')

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
  )
}

export default CommentInput