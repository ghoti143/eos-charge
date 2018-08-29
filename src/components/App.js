import React from 'react'
import Footer from './Footer'
import Foo from './Foo'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <Foo />
  </div>
)

export default App