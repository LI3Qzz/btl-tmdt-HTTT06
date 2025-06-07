import React, { useEffect } from 'react'
import { Checkout } from '../features/checkout/components/Checkout'
import {Footer} from '../features/footer/Footer'
import { useDispatch } from 'react-redux'
import { resetCurrentOrder } from '../features/order/OrderSlice'

export const CheckoutPage = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(resetCurrentOrder())
  },[])
  return (
    <>
    <Checkout/>
    <Footer/>
    </>
  )
}
