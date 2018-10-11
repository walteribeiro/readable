import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestNewComment, requestEditComment } from '../store/ducks/post'
import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap'

class FormComment extends Component {
  state = {
    id: 0,
    parentId: 0,
    body: '',
    author: '',
    timestamp: ''
  }

  componentWillReceiveProps = nextProps => {
    const { comment } = nextProps

    if (comment) {
      this.setState({
        id: comment.id,
        parentId: comment.parentId,
        body: comment.body,
        author: comment.author,
        category: comment.category,
        timestamp: comment.timestamp
      })
    }
  }

  submitForm = evt => {
    evt.preventDefault()

    if (this.state.id !== 0) {
      this.props.requestEditComment(this.state)
      this.props.toggle()
    } else {
      const currentDate = new Date()

      this.setState(
        {
          id: `react${currentDate.getTime()}`,
          timestamp: currentDate.getTime(),
          parentId: this.props.postId,
          deleted: false,
          parentDeleted: false
        },
        () => {
          this.props.requestNewComment(this.state)
          this.props.toggle()
        }
      )
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            {this.props.modalTitle}
          </ModalHeader>
          <Form onSubmit={this.submitForm}>
            <ModalBody>
              <FormGroup>
                <Input
                  type="textarea"
                  required
                  placeholder="What are your thoughts today?"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  required
                  placeholder="Who are you?"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Save
              </Button>{' '}
              <Button color="secondary" onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestNewComment, requestEditComment }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(FormComment)
