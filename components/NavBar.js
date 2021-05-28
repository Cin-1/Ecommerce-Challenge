import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { FirebaseContext } from '../firebase'

const Navigation = ({}) => {
  const [isExpanded, toggleExpansion] = useState(false)
  const { user, firebase } = useContext(FirebaseContext)

  return (
    <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
      <div className="flex items-center flex-shrink-0 text-neutral mr-6">
        <Link href="/">
          <a>Mis Fans</a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-neutral border-teal-400 hover:text-neutral hover:border-neutral"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isExpanded ? `block` : `hidden`
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <Link href="/sellers">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-neutral hover:text-neutral mr-4">
              Sellers
            </a>
          </Link>
        </div>
      </div>

      {user ? (
        <>
          <p className="block mt-4 lg:inline-block lg:mt-0 text-neutral hover:text-neutral mr-4">
            Hello {user.displayName}!
          </p>

          <button
            onClick={() => firebase.logout()}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-neutral border-neutral hover:border-transparent hover:text-primary hover:bg-neutral mt-4 lg:mt-0 mr-3"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-neutral border-neutral hover:border-transparent hover:text-primary hover:bg-neutral mt-4 lg:mt-0 mr-3">
              Login
            </a>
          </Link>
          <div>
            <Link href="/register">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-neutral border-neutral hover:border-transparent hover:text-primary hover:bg-neutral mt-4 lg:mt-0 ">
                Create Account
              </a>
            </Link>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navigation
