import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    showElementLevel(level) {
        let eleLevel = <span className="label label-default">Small</span>;
        if (level === 1) {
            eleLevel = <span className="label label-info">Medium</span>
        }
        else if (level === 2) {
            eleLevel = <span className="label label-danger">High</span>
        }
        return eleLevel;
    }

    handleDelete(id) {
        this.props.onClickDelete(id);
    }

    handleEdit(item) {
        this.props.onClickEdit(item);
    }

    render() {
        const item = this.props.item;
        const index = this.props.index;
        
        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-center">{this.showElementLevel(item.level)}</td>
                <td>
                    <button onClick={() => this.handleEdit(item)} type="button" className="btn btn-warning">Edit</button>
                    <button onClick={() => this.handleDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default Item;