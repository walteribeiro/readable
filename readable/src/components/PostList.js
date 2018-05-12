import React, {Component} from 'react'
import arraySort from 'array-sort'
import * as ReadableAPI from '../utils/ReadableAPI'

class PostList extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        ReadableAPI
            .getAllPosts()
            .then(response => this.setState({ posts: response }))
    }

    orderBy = param => {
        let resultOrder = []
        if (param === 'timestamp') {
            resultOrder = arraySort(this.state.posts, param)
        } else {
            resultOrder = arraySort(this.state.posts, param, { reverse: true })
        }
        this.setState({ posts: resultOrder })
    }

    vote = (post, vote) => {        
        post.voteScore += vote
        const postFilter = this.state.posts.filter(obj => obj.id !== post.id)
        this.setState({ posts: postFilter.concat(post) })
    }

    render() {
        const {posts} = this.state
        return (
            <div>
                <button type="button" onClick={() => this.orderBy('voteScore')}>Vote Score</button>
                <button type="button" onClick={() => this.orderBy('timestamp')}>Created Date</button>
            <ul type="none">
                {posts && posts.map(post => (
                    <li key={post.id}>
                        <h2>Title: {post.title}</h2> 
                        <h3>Author: {post.author}</h3>                         
                        <p><small>Comments: {post.commentCount}</small></p>                    
                        <p><small>Votes: {post.voteScore}</small></p>
                        <div>
                            <button type="button" onClick={() => this.vote(post, 1)}>+</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" onClick={() => this.vote(post, -1)}>-</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        );
    }
}

export default PostList;