import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="flex p-1 justify-between">
      <Link href="/">
        <a className="flex p-1">Inicio</a>
      </Link>
      <Link href="/populares">
        <a className="flex p-1">Populares</a>
      </Link>
      <Link href="/nuevo-producto">
        <a className="flex p-1">Nuevo producto</a>
      </Link>
      <p className="flex p-1">Hello Cin! </p>
      <button className="flex p-1">Logout</button>
      <Link href="/login" className="flex p-1">
        <button>Login</button>
      </Link>
      <Link href="/register" className="flex p-1">
        <button className="flex p-1 flex justify-end ">Create Account</button>
      </Link>
    </nav>
  )
}

export default NavBar
