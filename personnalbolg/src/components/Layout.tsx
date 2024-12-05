import React from 'react'

import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Hearder from './Hearder'
import Posts from './Posts'
const Layout = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Hearder />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
