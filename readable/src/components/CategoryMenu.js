import React, {Component} from 'react'
import * as ReadableAPI from '../utils/ReadableAPI'

class CategoryMenu extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        ReadableAPI
            .getAllCategories()
            .then(response => this.setState({categories: response.categories}))
    }

    render() {
        const {categories} = this.state
        return (
            <div>
                <ul>
                    {categories && categories.map(obj => (
                        <li key={obj.name}>
                            <a href={obj.path}>{obj.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default CategoryMenu
