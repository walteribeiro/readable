import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostList from './PostList'
import { requestPostsByCategory } from '../store/ducks/post'

export class PostPage extends Component {
  componentDidMount = () => {
    this.props.requestPostsByCategory(this.props.match.params.category)
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.requestPostsByCategory(nextProps.match.params.category)
    }
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
  bindActionCreators({ requestPostsByCategory }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(PostPage)
