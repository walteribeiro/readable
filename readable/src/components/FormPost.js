import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestNewPost } from '../store/ducks/post'
import {
  Button,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap'

class FormPost extends Component {
  state = {
    id: 0,
    title: '',
    body: '',
    author: '',
    category: '',
    timestamp: '',
  }

  submitForm = (evt) => {
    evt.preventDefault()
    const currentDate = new Date()

    this.setState({
      id: `react${currentDate.getTime()}`,
      timestamp: currentDate.getTime()
    }, () => {
      this.props.requestNewPost(this.state)
      this.props.toggle()
    })
  }

  handleInputChange = (event)  => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>{this.props.modalTitle}</ModalHeader>
          <Form onSubmit={this.submitForm}>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  required placeholder="Title"
                  name="title" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  required placeholder="What are your thoughts today?"
                  name="body" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup row>
                <Col sm={7}>
                  <Input
                    type="text"
                    required placeholder="Who are you?"
                    name="author" onChange={this.handleInputChange} />
                </Col>
                <Col sm={5}>
                  <Input value={this.props.selectedCategory}
                    type="select"
                    required
                    name="category" onChange={this.handleInputChange}>
                    <option defaultChecked value="">Select a category</option>
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                    <option value="udacity">Udacity</option>
                  </Input>
                </Col>
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

const mapDispatchToProps = dispatch => bindActionCreators({ requestNewPost }, dispatch)

export default connect(null, mapDispatchToProps)(FormPost)
