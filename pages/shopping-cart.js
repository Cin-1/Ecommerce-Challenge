import React, { useState, useContext } from 'react'
import Layout from '../components/layouts/layout'
import Cart from '../components/cart'

const Admin = () => {
  return (
    <div className="bg-primary">
      <Layout />
      <Cart />
    </div>
  )
}

export default Admin
