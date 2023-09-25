import { Outlet, createBrowserRouter } from "react-router-dom"
import "./App.css"
import Navbar from "./component/Navbar"
import HomePage from "./pages/HomePage"


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
      }
    ]
  }
])

export default router