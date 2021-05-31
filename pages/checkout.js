import React, { useState, useContext } from 'react'
import Layout from '../components/layouts/layout'
import Order from '../components/order'
import Checkout from '../components/personalData'
import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from 'react-use-cart'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE)

export const getServerSideProps = async ctx => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  let paymentIntent

  const { paymentIntentId } = await parseCookies(ctx)

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      props: {
        paymentIntent
      }
    }
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd'
  })

  setCookie(ctx, 'paymentIntentId', paymentIntent.id)

  return {
    props: {
      paymentIntent
    }
  }
}

const Admin = ({ paymentIntent }) => {
  const { cartTotal } = useCart()

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-primary font-montserrat">
        <Layout />
        <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-6">
          <Checkout paymentIntent={paymentIntent} />
          <Order />
        </div>
      </div>
    </Elements>
  )
}

export default Admin
