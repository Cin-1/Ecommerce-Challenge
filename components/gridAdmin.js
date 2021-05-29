import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase'

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
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block w-full align-middle">
          <div className="overflow-hidden sm:rounded-lg">
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
                  >
                    Products
                  </th>
                  <th scope="col" className="relative py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary bg-secondary">
                {people.map(person => (
                  <tr key={person.email}>
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
                          <div className="text-sm text-neutral">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral">{person.title}</div>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral">O</div>
                    </td>
                    <td className="py-4 text-sm text-neutral whitespace-nowrap">
                      O
                    </td>
                    <td className="py-4 text-sm font-medium text-right whitespace-nowrap">
                      <td className="py-4 text-sm text-neutral whitespace-nowrap">
                        []
                      </td>
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
