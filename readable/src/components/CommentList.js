import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import arraySort from 'array-sort'
import { formatDate } from '../utils/helpers'
import { requestNewComment, voteComment } from '../store/ducks/post'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle
} from 'reactstrap'
import FormComment from './FormComment'
import DeleteModal from './DeleteModal'
import Pen from 'react-icons/lib/ti/pen'
import Up from 'react-icons/lib/ti/thumbs-up'
import Down from 'react-icons/lib/ti/thumbs-down'

class CommentList extends Component {
  state = {
    filterKey: 'voteScore',
    openModal: false,
    openDeleteModal: false,
    commentId: null,
    selectedComment: null
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  toggleEditModal = comment => {
    this.setState({
      selectedComment: comment,
      openModal: !this.state.openModal
    })
  }

  toggleDeleteModal = commentId => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal,
      commentId
    })
  }

  render() {
    const { comments, postId } = this.props
    const {
      filterKey,
      openModal,
      openDeleteModal,
      commentId,
      selectedComment
    } = this.state
    const filteredList = comments
      ? arraySort(comments, filterKey, { reverse: true })
      : []
    return (
      <div>
        <FormComment
          open={openModal}
          toggle={this.toggleModal}
          postId={postId}
          comment={selectedComment && selectedComment}
          modalTitle="Add/Edit Comment"
        />
        <DeleteModal
          open={openDeleteModal}
          toggle={this.toggleDeleteModal}
          id={commentId}
          requestType={'comment'}
          title={'Are you sure you want to delete this comment?'}
          modalTitle="Delete Comment"
        />
        <div className="clearfix">
          <div className="float-right">
            <strong>Sort comments by:</strong>{' '}
            <Button
              outline
              color="dark"
              size="sm"
              onClick={() => {
                this.setState({ filterKey: 'voteScore' })
              }}
            >
              Vote Score
            </Button>{' '}
            <Button
              outline
              color="dark"
              size="sm"
              onClick={() => {
                this.setState({ filterKey: 'timestamp' })
              }}
            >
              Created Date
            </Button>{' '}
            <Button
              outline
              color="primary"
              size="sm"
              onClick={() => this.toggleModal()}
            >
              <Pen size={20} />
              New Comment
            </Button>
          </div>
        </div>

        {filteredList &&
          filteredList.map(comment => (
            <Card key={comment.id} style={{ marginBottom: 10, marginTop: 5 }}>
              <CardBody>
                <CardTitle className="clearfix">
                  <div className="float-right">
                    <Button
                      color="link"
                      onClick={() => this.toggleEditModal(comment)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="link"
                      onClick={() => this.toggleDeleteModal(comment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardTitle>
                <CardSubtitle>
                  Author: {comment.author}
                  <div className="float-right">
                    {formatDate(comment.timestamp)}
                  </div>
                </CardSubtitle>
                <hr />
                <CardText>{comment.body}</CardText>
                <ButtonGroup>
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() => this.props.voteComment(comment.id, 'upVote')}
                  >
                    <Up size={22} />
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() =>
                      this.props.voteComment(comment.id, 'downVote')
                    }
                  >
                    <Down size={22} />
                  </Button>
                </ButtonGroup>
                <div className="clearfix float-right">
                  <Badge color="secondary" pill>
                    Votes: {comment.voteScore}
                  </Badge>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.posts.comments
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestNewComment, voteComment }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
