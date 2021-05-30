import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layouts/layout'
import { FirebaseContext } from '../../firebase'
import { useRouter } from 'next/router'
import ProductsCard from '../../components/productsCart'

function Products() {
  const [productsData, setproductsData] = useState([])

  const router = useRouter()
  const { user, firebase } = useContext(FirebaseContext)
  const getProducts = query => {
    const all = firebase.db.collection('products')
    all.where('user', '==', query).onSnapshot(handleSnap)
  }
  useEffect(() => {
    if (router.query.id) {
      console.log('useEffect')
      getProducts(router.query.id)
    }
  }, [router.query.id])

  function handleSnap(snapshot) {
    const productsData = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setproductsData(productsData)
    console.log(productsData)
  }

  return (
    <>
      <Layout />
      <div className="flex flex-wrap bg-primary">
        {productsData.map(product => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>{' '}
    </>
  )
}
export default Products
