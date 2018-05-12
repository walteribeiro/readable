import React, {Component} from 'react'
import PostList from './PostList'
import CategoryMenu from './CategoryMenu'

class App extends Component {

  render() {
    return (
      <div className="App">
        <CategoryMenu/>
        <PostList/>
      </div>
    );
  }
}

export default App;
