import React, { useState, useContext } from 'react'
import Layout from '../components/layouts/layout'
import CardPageVisits from '../components/order'
import Checkout from '../components/personalData'

const Admin = () => {
  return (
    <div className="bg-primary font-montserrat">
      <Layout />
      <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-6">
        <Checkout />
        <CardPageVisits />
      </div>
    </div>
  )
}

export default Admin
