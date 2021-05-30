import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase'
import Modal from './modal'
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
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
  const deleteSeller = async id => {
    try {
      await firebase.db.collection('sellers').doc(id).delete()
    } catch (err) {
      console.log(err)
    }
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
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium tracking-wider text-left uppercase text-neutral"
                  >
                    Title
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
                  ></th>
                  <th scope="col" className="relative py-3">
                    <span className="sr-only">Edit</span>
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
                      <div className="text-sm text-neutral">{person.email}</div>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral">{person.title}</div>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <button className="text-lg text-neutral">
                        <Link href={person.instagram}>
                          <AiOutlineInstagram />
                        </Link>
                      </button>
                    </td>
                    <td className="py-4 text-lg text-neutral whitespace-nowrap">
                      <button>
                        <Link href={person.instagram}>
                          <AiOutlineFacebook />
                        </Link>
                      </button>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <button className="text-lg text-neutral">
                        <Link href={person.instagram}>
                          <AiOutlineEdit />
                        </Link>
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
                    <td className="py-4 text-lg text-neutral whitespace-nowrap">
                      <Modal person={person} key={person.id} />
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
