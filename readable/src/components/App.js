import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryMenu from './CategoryMenu'
import RootPage from './RootPage'
import PostPage from './PostPage'
import PostDetailPage from './PostDetailPage'
import { Container, Col, Navbar, NavbarBrand, Row } from 'reactstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">Readable</NavbarBrand>
        </Navbar>

        <Container fluid style={{ marginTop: 50 }}>
          <Row>
            <Col xs="3">
              <CategoryMenu />
            </Col>
            <Col>
              <Switch>
                <Route exact path="/" component={RootPage} />
                <Route path="/:category/:post_id" component={PostDetailPage} />
                <Route path="/:category" component={PostPage} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
