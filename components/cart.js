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
import Link from 'next/link'

export default function Table() {
  const { user, firebase } = useContext(FirebaseContext)
  const [people, setPeople] = useState([])

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
  const deleteSeller = id => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then(result => {
      if (result.isConfirmed) {
        try {
          firebase.db.collection('sellers').doc(id).delete()
        } catch (err) {
          console.log(err)
        }
      }
    })
  }

  return (
    <div className="flex flex-col mx-5">
      <div className="overflow-x-auto">
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
                  </th>{' '}
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  ></th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  ></th>
                  <th scope="col" className="relative py-3"></th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  ></th>
                  <th
                    scope="col"
                    className="py-3 text-lg font-medium tracking-wider text-left uppercase ml-5text-xs text-neutral"
                  >
                    <button className="inline-block px-4 py-3 mt-4 mr-3 text-sm leading-none duration-300 rounded text-neutral hover:text-neutral bg-success hover:bg-successhover lg:mt-0">
                      CHECKOUT
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary bg-secondary">
                {people.map(person => (
                  <tr key={person.id}>
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={person.urlImg}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral">
                            {person.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <button className="text-lg text-neutral">
                        <AiOutlinePlusSquare />
                      </button>
                    </td>
                    <td className="py-4 text-lg text-neutral whitespace-nowrap">
                      <p>1</p>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <button className="text-lg text-neutral">
                        <AiOutlineMinusSquare />
                      </button>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <button
                        className="text-lg text-neutral"
                        onClick={() => {
                          deleteSeller(person.id)
                        }}
                      >
                        <AiOutlineDelete />
                      </button>
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