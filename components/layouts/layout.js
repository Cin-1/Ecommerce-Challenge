import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import NavBar from '../NavBar'

const Layout = props => {
  return (
    <>
      <Head>
        <title>Mis Fans</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet" />
      </Head>

      <main>{props.children}</main>
      <NavBar />
    </>
  )
}

export default Layout
