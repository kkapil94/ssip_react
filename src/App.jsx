import { Outlet, createBrowserRouter } from "react-router-dom"
import "./App.css"
import Navbar from "./component/Navbar"
import HomePage from "./pages/HomePage"
import Canvas from "./component/Canvas"


const AppLayout = ()=>{
  return(
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"canvas",
        element:<Canvas/>
      }
    ]
  }
])

export default router