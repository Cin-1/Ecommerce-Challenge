import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from './layouts/layout'
import { FirebaseContext } from '../firebase'
import Cards from './cards'

function Index() {
  const [data, setData] = useState([])
  const { user, firebase } = useContext(FirebaseContext)

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
    setData(people)
  }

  return (
    <>
      <div className="flex flex-wrap bg-primary">
        {data.map(person => (
          <Cards key={person.email} person={person} />
        ))}
      </div>
    </>
  )
}
export default Index
