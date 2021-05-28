import React, { useEffect, useState } from 'react'
import firebase from './firebase'

function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsuscribe()
  }, [])

  return user
}
export default useAuth
