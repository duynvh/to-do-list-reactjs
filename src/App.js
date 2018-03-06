import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
// import StudyForm from './components/StudyForm';
import task from './mocks/task';
import {filter, includes, orderBy as funcOrderBy, remove, reject} from 'lodash';
const uuidv4 = require('uuid/v4');
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      items: [],
      isShowForm: false,
      strSearch: '',
      orderBy: 'name',
      orderDir: 'asc',
      itemSelected: null
    };

    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handDelete = this.handDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    let items = JSON.parse(localStorage.getItem("task"));
    if(items === null) {
      items = task;
    }
    this.setState({
      items: items,
    });
  }

  handleEdit(item) {
    this.setState({
      itemSelected: item,
      isShowForm: true
    });
  }

  handleSubmit(item) {
    let items = this.state.items;
    let id = null;
    if(item.id !== '') {
      items = reject(items, {id: item.id});
      id = item.id;
    }
    else {
      id = uuidv4();
    }
    
    items.push({
        id: id,
        name: item.name,
        level: +item.level
    });

    this.setState({
      items: items,
      isShowForm: false
    });

    localStorage.setItem("task", JSON.stringify(items));
  }

  handDelete(id) {
    let items = remove(this.state.items, (item) => {
      return item.id === id
    });

    this.setState({
      items: this.state.items
    });

    localStorage.setItem("task", JSON.stringify(items));
  }

  handleSearch(value) {
    this.setState({
      strSearch: value
    });
  }

  handleSort(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    });
  }

  handleToggleForm() {
    this.setState({
      isShowForm: !this.state.isShowForm,
      itemSelected: null
    });
  }

  closeForm() {
    this.setState({
      isShowForm: false
    });
  }

  render() {
    let itemsOrigin = [...this.state.items];
    let items = [];
    let isShowForm = this.state.isShowForm;
    let orderBy = this.state.orderBy;
    let orderDir = this.state.orderDir;
    let elmForm = null;
    const search = this.state.strSearch;

    // Search
    items = filter(itemsOrigin, (item) => {
      return includes(item.name, search);
    });

    //Sort
    items = funcOrderBy(items, [orderBy], [orderDir]);
  
    if (isShowForm) {
      elmForm = <Form itemSelected={this.state.itemSelected} onClickSubmit={this.handleSubmit} onClickCancel={this.closeForm}/>;
    }
    return (
      <div>
        {/* TITLE : START */}
        <Title />
        {/* TITLE : END */}
        {/* CONTROL (SEARCH + SORT + ADD) : START */}
        <Control orderBy={orderBy} orderDir={orderDir} onClickSearchGo={this.handleSearch} isShowForm={isShowForm} onClickAdd={this.handleToggleForm} onClickSort={this.handleSort}/>
        {/* CONTROL (SEARCH + SORT + ADD) : END */}
        {/* FORM : START */}
        {elmForm}
        {/* FORM : END */}
        {/* LIST : START */}
        <List onClickEdit={this.handleEdit} onClickDelete={this.handDelete} items={items}/>
        {/* LIST : END */}
        {/* <StudyForm /> */}
      </div>
    );
  }
}

export default App;
