import React from 'react'
import ReactDom from 'react-dom'
import { Route,BrowserRouter,Link,Switch } from "react-router-dom"
import routerDemo from "./routes"
class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to="/routerDemo/home">home</Link></li>
                    <li><Link to="/routerDemo/blog">blog</Link></li>
                    <li><Link to="/routerDemo/resume">resume</Link></li>
                </ul>
                <div>
                    {/* Switch只显示一个组件。加exact表示精确匹配/。如果不加exact，/xxx也会匹配/。  */}
                    <Switch>
                        {/* exact */}
                        {
                            routerDemo.map( item => {
                                return (
                                    <Route 
                                      path={ item.path } 
                                      key={ item.name } 
                                      exact={ item.exact }
                                      component={ item.component } 
                                    />
                                )
                            })
                        }
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDom.render(<App/>,document.getElementById("app"))