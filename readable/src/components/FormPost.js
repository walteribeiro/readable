import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class FormPost extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>New Post</ModalHeader>
          <ModalBody>Form Here</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default FormPost
