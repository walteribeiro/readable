import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestDeletePost, requestDeleteComment } from '../store/ducks/post'
import {
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

class DeleteModal extends Component {
  submitForm = evt => {
    evt.preventDefault()
    if (this.props.requestType === 'post') {
      this.props.requestDeletePost(this.props.id)
      this.props.toggle()
      this.props.history.push('/')
    } else {
      this.props.requestDeleteComment(this.props.id)
      this.props.toggle()
    }
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
              <p>{this.props.title}</p>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="danger">
                Confirm
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
  bindActionCreators({ requestDeletePost, requestDeleteComment }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(withRouter(DeleteModal))
