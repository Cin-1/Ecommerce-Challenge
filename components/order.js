import React from 'react'
import { useCart } from 'react-use-cart'

export default function Order() {
  const { items, cartTotal } = useCart()
  return (
    <>
      <div className="relative flex flex-col w-3/5 min-w-0 mt-5 mb-6 ml-5 rounded-lg shadow-xl bg-secondary h-2/3">
        <div className="px-6">
          <h1 className="mb-5 font-bold uppercase mt-7 text-neutral">
            Your order:
          </h1>
          {items.map(item => (
            <div
              className="flex flex-wrap justify-between text-neutral"
              key={item.id}
            >
              <div>{item.product}</div>
              <div>${item.price}</div>
            </div>
          ))}
          <div className="flex flex-wrap justify-between text-lg divide-y divide-primary text-neutral">
            <div>Total purchases:</div>
            <div>${cartTotal}</div>
          </div>
        </div>
      </div>
    </>
  )
}
