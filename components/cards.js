import React, { useContext } from 'react'
import { FirebaseContext } from '../firebase'
import Link from 'next/link'
import { AiFillInstagram, AiFillMail, AiFillFacebook } from 'react-icons/ai'

function Index({ person }) {
  const { user, firebase } = useContext(FirebaseContext)
  return (
    <>
      <div className="flex flex-col items-center pt-8 m-3 my-5 rounded-lg font-montserrat h-80 w-52 xl:w-1/4 2xl:w-1/5 md:py-12 bg-secondary text-neutral">
        <div className="flex items-center justify-center mb-7">
          <div className="flex flex-col items-center">
            <img
              src={person.urlImg}
              alt="profile"
              className="w-20 h-20 border-2 rounded-full border-successhover"
            />
            <p className="mt-2 text-base font-semibold text-center text-white sm:text-sm md:text-base">
              {person.name}
            </p>
            <p className="mt-1 text-sm text-center text-light font sm:text-sm md:text-base">
              {person.title}
            </p>
          </div>
        </div>

        {user ? (
          <Link href="/products[id]" as={`/products/${person.id}`}>
            <button className="inline-block w-3/4 py-3 text-sm font-bold leading-none uppercase duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
              Shop
            </button>
          </Link>
        ) : (
          <button className="inline-block w-3/4 py-3 text-sm font-bold leading-none uppercase duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
            Login to buy!
          </button>
        )}

        <div className="w-3/4 h-px mt-5 bg-light"></div>

        <div className="flex items-center mt-5 text-2xl">
          <div>
            <Link href={person.instagram}>
              <AiFillFacebook />
            </Link>
          </div>
          <div className="ml-11">
            <Link href={person.instagram}>
              <AiFillMail />
            </Link>
          </div>
          <div className="ml-11">
            <Link href={person.instagram}>
              <AiFillInstagram />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Index
