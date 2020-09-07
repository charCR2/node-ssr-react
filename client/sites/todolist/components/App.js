import React from 'react'
import AddTodo from "./AddTodo"
import TodoList from './TodoList'
import Top from './Top'
import './style.scss'

const App = () => (
  <div className="todo-box">
    <div className="todo-innerBox">
      <Top />
      <TodoList />
      <AddTodo />
    </div>
  </div>
)

export default App