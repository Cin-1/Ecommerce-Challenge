import React, { useContext } from 'react'
import { FirebaseContext } from '../firebase'
import { useCart } from 'react-use-cart'
import Link from 'next/link'

function ProductsCard({ product }) {
  const { user } = useContext(FirebaseContext)
  const { addItem, inCart, items } = useCart()

  return (
    <>
      <div className="flex flex-col w-64 m-5 rounded-lg h-96 xl:w-1/4 2xl:w-1/5 md:py-12 bg-secondary text-neutral">
        <div className="flex items-center justify-center pt-4">
          <div className="flex flex-col items-center">
            <img
              src={product.urlImg}
              alt="profile"
              className="object-cover w-full h-32 px-4 mb-4 rounded-2xl"
            />
            <p className="mt-2 text-lg font-semibold text-center capitalize text-success sm:text-sm md:text-base font-montserrat">
              {product.product}
            </p>
            <p className="w-3/4 h-16 mt-2 text-xs text-center text-neutral font sm:text-sm md:text-base font-montserrat">
              {product.description}
            </p>

            <p className="text-base font-bold text-light font-montserrat">
              Price
            </p>
            <p className="h-10 text-lg font-semibold font-bold text-center text-white sm:text-sm md:text-base">
              $ {product.price}
            </p>
          </div>
        </div>
        {user ? (
          <div className="flex px-4 font-montserrat">
            <button
              className="inline-block w-1/2 px-4 py-2 mr-2 text-sm font-bold leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0"
              onClick={() => addItem(product)}
              disabled={inCart(product.id)}
            >
              {inCart(product.id) ? 'Already in cart' : 'Add to cart'}
            </button>
            <Link href="/checkout">
              <button className="inline-block w-3/5 px-4 py-2 text-sm font-bold leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
                Proceed to checkout
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex px-4">
            <button className="self-center inline-block w-full py-3 text-sm font-bold leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
              Login to buy!
            </button>
          </div>
        )}
      </div>
      )
    </>
  )
}
export default ProductsCard
