import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatDate } from '../utils/helpers'
import {
  requestPostsById,
  requestCommentsOfPost,
  votePost
} from '../store/ducks/post'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from 'reactstrap'
import CommentList from './CommentList'
import FormPost from './FormPost'
import DeleteModal from './DeleteModal'
import Up from 'react-icons/lib/ti/thumbs-up'
import Down from 'react-icons/lib/ti/thumbs-down'

class PostDetailPage extends Component {
  state = {
    openModal: false,
    openDeleteModal: false,
    postId: null
  }

  componentDidMount() {
    this.loadPost()
  }

  loadPost = () => {
    const { post_id: id } = this.props.match.params
    this.props.requestPostsById(id)
    this.props.requestCommentsOfPost(id)
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  toggleDeleteModal = postId => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal,
      postId
    })
  }

  render() {
    const { post } = this.props
    const { openModal, openDeleteModal } = this.state
    return (
      <div>
        <FormPost
          open={openModal}
          toggle={this.toggleModal}
          modalTitle="Edit Post"
          post={post && post}
        />
        <DeleteModal
          open={openDeleteModal}
          toggle={this.toggleDeleteModal}
          id={post && post.id}
          requestType={'post'}
          title={'Are you sure you want to delete this post?'}
          modalTitle="Delete Post"
        />
        {post && (
          <Card key={post.id} style={{ marginBottom: 10, marginTop: 5 }}>
            <CardBody>
              <CardTitle>
                {post.title}
                <div className="float-right">
                  <Button color="link" onClick={() => this.toggleModal()}>
                    Edit
                  </Button>
                  <Button
                    color="link"
                    onClick={() => this.toggleDeleteModal(post.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardTitle>
              <br />
              <CardSubtitle>
                Author: {post.author}
                <div className="float-right">{formatDate(post.timestamp)}</div>
              </CardSubtitle>
              <hr />
              <CardText>{post.body}</CardText>
              <ButtonGroup>
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => this.props.votePost(post.id, 'upVote')}
                >
                  <Up size={22} />
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.props.votePost(post.id, 'downVote')}
                >
                  <Down size={22} />
                </Button>
              </ButtonGroup>
              <div className="clearfix float-right">
                <Badge color="dark" pill>
                  Comments: {post.commentCount}
                </Badge>{' '}
                <Badge color="secondary" pill>
                  Votes: {post.voteScore}
                </Badge>
              </div>
            </CardBody>
          </Card>
        )}

        <Row>
          <Col sm={{ size: 9, offset: 3 }}>
            <CommentList postId={post && post.id} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.selectedPost
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestPostsById, requestCommentsOfPost, votePost },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailPage)
