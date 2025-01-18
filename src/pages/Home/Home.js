import React from 'react'
import Navbar from '../../componets/Navbar'
import Dashboard from '../Dashboard/Dashboard'
const Home = () => {
  return (
    <div>
      <Navbar />
      <div class="p-4 sm:ml-64">
        <Dashboard />


      </div>
    </div>
  )
}

export default Home