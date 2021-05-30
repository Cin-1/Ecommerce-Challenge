import React, { useState, useContext } from 'react'
import Layout from '../components/layouts/layout'
import GridAdmin from '../components/gridAdmin'

const Admin = () => {
  return (
    <div className="bg-primary">
      <Layout />
      <GridAdmin />
    </div>
  )
}

export default Admin
