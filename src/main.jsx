import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import PostPage from './pages/PostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import './index.css'
const router=createBrowserRouter([
  {
    path:"/",
element:<App/>
,children:[
  {path:"/",
    element:<HomePage/>
  },{
    path:"/login",
    element:<Login/>
  },{
    path:"/signup",
    element:<Signup/>
  },{
path:"/add-post",
element:<AddPost/>
  },{
    path:"/post/:slug",
    element:<PostPage/>
  },{
    path:"/edit-post/:slug",
    element:<EditPostPage/>
  },
],
  },
  
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router}/>
    </Provider>

)
