
import asyncRouter from "utils/loadable.js"

export default  [
    {
      name: 'blog',
      path: "/routerDemo/blog",
      component: asyncRouter( () => import("./pages/blog")), 
      exact: true
    },
    {
      name: 'home',
      path: "/routerDemo/home",
      component: asyncRouter( () => import("./pages/home")), 
      exact: false
    },
    {
      name: 'resume',
      path: "/routerDemo/resume",
      component: asyncRouter( () => import("./pages/resume")), 
      exact: true
    },
    {
      name: 'concurrent',
      path: "/routerDemo/concurrent",
      component: asyncRouter( () => import("./pages/concurrent")), 
      exact: true
    }
  ]