import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestPosts } from '../store/ducks/post'
import PostList from './PostList'

export class RootPage extends Component {
  componentDidMount = () => {
    this.props.requestPosts()
  }

  render() {
    return (
      <div>
        <PostList />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestPosts }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(RootPage)
