import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import arraySort from 'array-sort'
import { formatDate } from '../utils/helpers'
import { votePost } from '../store/ducks/post'
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
import FormPost from './FormPost'
import Pen from 'react-icons/lib/ti/pen'
import Up from 'react-icons/lib/ti/thumbs-up'
import Down from 'react-icons/lib/ti/thumbs-down'

class PostList extends Component {
  state = {
    filterKey: 'voteScore',
    openModal: false
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  render() {
    const { posts } = this.props
    const { filterKey, openModal } = this.state
    const filteredList = posts
      ? arraySort(posts, filterKey, { reverse: true })
      : []
    return (
      <div>
        <FormPost
          open={openModal}
          toggle={this.toggleModal}
          modalTitle="Add Post"
        />
        <div className="clearfix">
          <Button
            outline
            color="primary"
            size="sm"
            className="float-left"
            onClick={() => this.toggleModal()}
          >
            <Pen size={20} />
            New Post
          </Button>
          <div className="float-right">
            <strong>Sort by:</strong>{' '}
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
            </Button>
          </div>
        </div>

        {filteredList &&
          filteredList.map(post => (
            <Card key={post.id} style={{ marginBottom: 10, marginTop: 5 }}>
              <CardBody>
                <CardTitle>
                  {post.title}
                  <Link
                    className="float-right"
                    to={`${post.category}/${post.id}`}
                  >
                    <Button color="link">Details</Button>
                  </Link>
                </CardTitle>
                <br />
                <CardSubtitle>
                  Author: {post.author}
                  <div className="float-right">
                    {formatDate(post.timestamp)}
                  </div>
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
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ votePost }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
