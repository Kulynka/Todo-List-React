import React from 'react';
import './App.css';
import shortid from 'shortid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: '',
      list: [],
    }
  }
  // Saves data from input
  saveInputData = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  // Adding new task to list
  addToList = (e) => {
    e.preventDefault();
    const saveData = {
      data: this.state.inputData,
      complete: false,
      id: shortid.generate(),
      display: false
    }
    this.setState({
      list: [saveData, ...this.state.list],
      inputData: '',
    })
  }
  // Cross out task
  toggleTask = id => {
    this.setState(state => ({
      list: state.list.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      })
    }))
  }
  // Delete all done tasks
  deleteTasks = () => {
    this.setState(state => ({
      list: state.list.filter(todo => !todo.complete)
    }));
  }
  // Hide or show completed tasks
  toggleTasks = () => {
    this.setState(state => ({
      list: state.list.map(todo => {
        if (todo.complete === true) {
          return {
            ...todo,
            display: !todo.display
          }
        } else {
          return todo;
        }
      })
    }));
  }
  // Clear list. Deletes all tasks
  clear = () => {
    this.setState({
      list: []
    })
  }
  // Deletes an item
  deleteItem = (id) => {
    this.setState({
      list: this.state.list.filter(todo => todo.id !== id)
    })
  }

  render() {
    return (
      <div className="main">
        <div className="inputList">
          <form action="" onSubmit={this.addToList}>
            <input
              name="inputData"
              type="text"
              className="input"
              value={this.state.inputData}
              onChange={this.saveInputData} />
            <button type="submit" className="inputBtn">Add</button>
          </form>
          <div className="list">
            <ul>
              {this.state.list.map(todo =>
                <div
                  key={todo.id} className="listItem"
                  style={{ display: todo.display ? "none" : "" }}
                >
                  <li
                    onClick={() => this.toggleTask(todo.id)}
                    style={{ textDecoration: todo.complete ? "line-through" : "" }}
                  >
                    <p>{todo.data}</p></li>
                  <button
                    onClick={() => this.deleteItem(todo.id)}
                    className="itemBtn">x</button>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className='buttons'>
          <button onClick={this.toggleTasks}>Hide/Show Completed Tasks</button>
          <button onClick={this.deleteTasks}>Delete completed tasks</button>
          <button onClick={this.clear}>Clear all</button>
        </div>

      </div>
    )
  }
}
export default App;
