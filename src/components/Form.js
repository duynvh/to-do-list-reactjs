import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            level: 0
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        let item = this.props.itemSelected;
        this.updateItem(item);
    }

    componentWillReceiveProps(nextProps) {
        let item = nextProps.itemSelected;
        this.updateItem(item);
    }

    updateItem(item) {
        if(item !== null) {
            this.setState({
                id: item.id,
                name: item.name,
                level: item.level
            });
        }
    }

    handleCancel() {
        this.props.onClickCancel();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const value = target.value
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        let item = {
            id: this.state.id,
            name: this.state.name,
            level: this.state.level
        };
        this.props.onClickSubmit(item);
        event.preventDefault();
    }

    render() {
        
        return (
            <div className="row">
                <div className="col-md-offset-7 col-md-5">
                    <form onSubmit={this.handleSubmit} className="form-inline">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="true">label</label>
                            <input  value={this.state.name} onChange={this.handleChange} name="name" type="text" className="form-control" placeholder="Task Name" ref="task_name" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="true">label</label>
                            <select  value={this.state.level} onChange={this.handleChange} name="level" id="inputDs" className="form-control" required="required" ref="task_level">
                                <option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button onClick={this.handleCancel} type="button" className="btn btn-default">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;