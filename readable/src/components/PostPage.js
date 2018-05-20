import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostList from './PostList'
import { requestPostsByCategory } from '../store/ducks/post'

export class PostPage extends Component {
  componentDidMount = () => {
    this.props.requestPostsByCategory(this.props.match.params.category)
  }

  render() {
    return (
      <div>
        <PostList data={this.props.posts} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post.list
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestPostsByCategory }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
