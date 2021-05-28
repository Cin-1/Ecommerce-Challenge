import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { FirebaseContext } from '../firebase'

const Navigation = ({}) => {
  const [isExpanded, toggleExpansion] = useState(false)
  const { user, firebase } = useContext(FirebaseContext)
  console.log(user)

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-secondary">
      <div className="flex items-center flex-shrink-0 mr-6 text-neutral">
        <Link href="/">
          <a>Mis Fans</a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border border-teal-400 rounded text-neutral hover:text-neutral hover:border-neutral"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
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
            <a className="block mt-4 mr-4 lg:inline-block lg:mt-0 text-neutral hover:text-neutral">
              Sellers
            </a>
          </Link>
          {user && user.displayName === 'admin' ? (
            <Link href="/admin">
              <a className="block mt-4 mr-4 lg:inline-block lg:mt-0 text-neutral hover:text-neutral">
                admin
              </a>
            </Link>
          ) : null}
        </div>

        {user ? (
          <>
            <p className="block mt-4 mr-4 lg:inline-block lg:mt-0 text-neutral hover:text-neutral">
              Hello {user.displayName}!
            </p>

            <button
              onClick={() => firebase.logout()}
              className="inline-block px-4 py-3 mt-4 mr-3 text-sm leading-none rounded text-neutral hover:text-neutral bg-success hover:bg-successhover duration-300 lg:mt-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <a className="inline-block px-4 py-3 mt-4 mr-3 text-sm leading-none rounded text-neutral hover:border-transparent hover:text-neutral bg-success hover:bg-successhover duration-300 lg:mt-0">
                Login
              </a>
            </Link>
            <div>
              <Link href="/register">
                <a className="inline-block px-4 py-3 mt-4 text-sm leading-none rounded text-neutral hover:border-transparent hover:text-neutral bg-success hover:bg-successhover duration-300 lg:mt-0 ">
                  Create Account
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation
