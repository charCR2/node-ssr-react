import React from 'react'
import ReactDom from 'react-dom'
import TodoList from './components/App'
import { StoreProvider } from "./store"
import todoApp from './store/reducers'
const FilterStore = {
    active: "SHOW_ALL"
  }

class App extends React.Component {
    render(){
        return (
            <StoreProvider
            reducer={todoApp}
            initialState={{
                    FilterStore,
            }}
          >
                <TodoList />
            </StoreProvider>
        )
    }
}
ReactDom.render(<App/>,document.getElementById("app"))