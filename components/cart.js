import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase'
import Swal from 'sweetalert2'
import Link from 'next/link'
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineDelete
} from 'react-icons/ai'
import { useCart } from 'react-use-cart'

export default function Table() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart()

  const remove = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then(result => {
      if (result.isConfirmed) {
        emptyCart()
      }
    })
  }
  if (isEmpty) return <p>Your cart is empty</p>
  return (
    <div className="flex flex-col mx-5 font-montserrat">
      <div className="overflow-x-auto">
        <div className="inline-block w-full align-middle">
          <div className="mx-1 overflow-hidden sm:rounded-lg">
            <div className="flex justify-between mt-5 ">
              <div>
                <h1 className="text-2xl font-bold text-neutral">
                  Cart ({totalUniqueItems})
                </h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    remove()
                  }}
                  className="inline-block px-4 py-3 mt-4 mr-3 text-sm font-bold leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0"
                >
                  EMPTY CART
                </button>
                <Link href="/checkout">
                  <button className="inline-block px-4 py-3 mt-4 mr-3 text-sm font-bold leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            </div>

            <table className="w-full divide-y divide-primary">
              <thead className="bg-table">
                <tr>
                  <th
                    scope="col"
                    className="py-3 pl-5 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    Price
                  </th>

                  <th
                    scope="col"
                    className="flex justify-center py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    quantity
                  </th>

                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    Delete item
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    Total = ${cartTotal}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary bg-secondary">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="py-4 pl-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.urlImg}
                            alt="product"
                          />
                        </div>
                        <div className="ml-4 text-sm font-medium text-neutral ">
                          <div className="text-sm font-medium text-neutral">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <button className="text-lg text-neutral">
                        <p>{item.price}</p>
                      </button>
                    </td>
                    <td className="flex items-center justify-center py-4 text-sm font-medium whitespace-nowrap text-neutral">
                      <button
                        className="text-lg text-neutral"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AiOutlinePlusSquare />
                      </button>
                      <p className="px-3 font-bold">{item.quantity}</p>

                      <button
                        className="py-4 text-lg text-neutral"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <AiOutlineMinusSquare />
                      </button>
                    </td>

                    <td className="py-4">
                      <button
                        className="pl-6 text-lg text-neutral"
                        onClick={() => {
                          removeItem(item.id)
                        }}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                    <td className="py-4 text-lg text-neutral">
                      <p>{parseInt(item.price) * parseInt(item.quantity)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
