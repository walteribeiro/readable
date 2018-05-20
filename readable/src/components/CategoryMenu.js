import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestCategories } from '../store/ducks/category'
import { ListGroup, ListGroupItem } from 'reactstrap'

export class CategoryMenu extends Component {
  componentDidMount = () => {
    this.props.requestCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <ListGroup>
          <Link to="/" key="all">
            <ListGroupItem>All</ListGroupItem>
          </Link>
          {categories &&
            categories.map(obj => (
              <Link to={obj.path} key={obj.name}>
                <ListGroupItem>{obj.name}</ListGroupItem>
              </Link>
            ))}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = state => ({ categories: state.category.list })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCategories }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu)
