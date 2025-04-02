import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Blogs from './Pages/Blogs'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import PageNotFound from './Pages/PageNotFound'
export default function App() {
  return (
     <BrowserRouter>
          <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='blogs' element={<Blogs/>}/>
                    <Route path='contact' element={<Contact/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Route>    
          </Routes>
     </BrowserRouter>
  )
}

