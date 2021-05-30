import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase'
import Modal from './modalAddProduct'
import Swal from 'sweetalert2'

import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUserAdd
} from 'react-icons/ai'
import { CartProvider, useCart } from 'react-use-cart'
import Link from 'next/link'

export default function Table() {
  const { user, firebase } = useContext(FirebaseContext)
  const [people, setPeople] = useState([])
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart()

  const getSellers = () => {
    firebase.db.collection('sellers').orderBy('name').onSnapshot(handleSnap)
  }

  useEffect(() => {
    getSellers()
  }, [])

  function handleSnap(snapshot) {
    const people = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setPeople(people)
  }
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
    <div className="flex flex-col mx-5">
      <div className="overflow-x-auto">
        <h1>Cart ({totalUniqueItems})</h1>

        <div className="inline-block w-full align-middle">
          <div className="mx-1 overflow-hidden sm:rounded-lg">
            <table className="w-full divide-y divide-primary">
              <thead className="bg-table">
                <tr>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
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
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  ></th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    quantity
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  ></th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  ></th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-lg font-medium tracking-wider text-left uppercase ml-5text-xs text-neutral"
                  >
                    <button
                      onClick={() => {
                        remove()
                      }}
                      className="inline-block px-4 py-3 mt-4 mr-3 text-sm leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0"
                    >
                      EMPTY CART{' '}
                    </button>
                    <button className="inline-block px-4 py-3 mt-4 mr-3 text-sm leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
                      CHECKOUT
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary bg-secondary">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.urlImg}
                            alt="product"
                          />
                        </div>
                        <div className="ml-4">
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
                    <td className="py-4 whitespace-nowrap">
                      <button
                        className="text-lg text-neutral"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AiOutlinePlusSquare />
                      </button>
                    </td>
                    <td className="py-4 text-lg text-neutral whitespace-wrap">
                      <p>{item.quantity}</p>
                    </td>
                    <td
                      className="py-4 whitespace-nowrap"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <button className="text-lg text-neutral">
                        <AiOutlineMinusSquare />
                      </button>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <button
                        className="text-lg text-neutral"
                        onClick={() => {
                          removeItem(item.id)
                        }}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                    <td className="py-4 text-lg text-neutral whitespace-nowrap">
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
