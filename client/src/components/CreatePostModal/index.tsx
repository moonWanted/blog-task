import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"

interface Props {
  show: boolean;
  handleClose: () => void;
  createPost: (content: string, user: string) => void;
}

function CreatePostModal(props: Props) {
  const [content, setContent] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const { show, createPost, handleClose } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createPost && createPost(user, content)
  }

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value)
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="postForm.name">
                <Form.Label>Your name</Form.Label>
                <Form.Control required onChange={handleUserChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="postForm.content">
                <Form.Label>Post Content</Form.Label>
                <Form.Control required onChange={handleContentChange} as="textarea" rows={3}/>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={!content || !user} variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreatePostModal