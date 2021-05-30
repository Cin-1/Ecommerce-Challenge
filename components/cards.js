import React, { useContext } from 'react'
import { FirebaseContext } from '../firebase'
import Link from 'next/link'
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineFacebook
} from 'react-icons/ai'

function Index({ person }) {
  const { user, firebase } = useContext(FirebaseContext)
  return (
    <>
      <div className="flex flex-col px-3 py-16 m-5 rounded-lg xl:w-1/4 2xl:w-1/5 md:py-12 bg-gradient-to-r from-indigo-700 to-purple-500">
        <div className="flex items-center justify-center ">
          <div className="flex flex-col items-center">
            <img
              src={person.urlImg}
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
            <p className="mt-2 text-xs font-semibold text-center text-white sm:text-sm md:text-base">
              {person.name}
            </p>
            <p className="mt-2 text-xs text-center text-white font sm:text-sm md:text-base">
              {person.title}
            </p>
          </div>
        </div>
        <div className="flex items-center mb-5 mt-7">
          <div className="ml-6">
            <Link href={person.instagram}>
              <AiOutlineFacebook />
            </Link>
          </div>
          <div className="ml-6">
            <Link href={person.instagram}>
              <AiOutlineMail />
            </Link>
          </div>
          <div className="ml-6">
            <Link href={person.instagram}>
              <AiOutlineInstagram />
            </Link>
          </div>
        </div>
        {user ? (
          <Link href="/products[id]" as={`/products/${person.id}`}>
            <button className="inline-block px-4 py-3 mt-10 mr-3 text-sm leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
              SHOP!
            </button>
          </Link>
        ) : (
          <button className="inline-block px-4 py-3 mt-10 mr-3 text-sm leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
            Login to buy!
          </button>
        )}
      </div>
    </>
  )
}
export default Index
