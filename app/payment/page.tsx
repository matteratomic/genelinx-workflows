'use client'
import React, { useState,useCallback } from 'react';
import {Separator} from '../../components/ui/separator'
import {useRouter} from 'next/navigation'

const PaymentForm = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const router = useRouter()
  const [loading,setLoading] = useState(false)

  const sleep = (time)=>{
    return new Promise((resolve)=>{
      setTimeout(resolve,time)
    })
  }

  const handlePayment = useCallback(async ()=>{
    setLoading(true)
    await sleep(3000)
    setLoading(false)
    router.push('/digital-booking')
  }
,[router]) 

  return (
    <>
{loading? 
    <div className="flex items-center justify-center fixed bg-black/50 inset-0 z-10">
      <div className="w-24 h-24 border-8 border-white rounded-full border-b-primary animate-spin"/>
    </div>
   : null}
    <svg className="absolute scale-y-105 bg-emerald-50/50" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800"><g shape-rendering="crispEdges" stroke-linejoin="round" fill="#ffffff"><polygon points="1422,0 1422,200 1066.5,200"></polygon><polygon points="1066.5,0 1066.5,200 711,200"></polygon><polygon points="888.75,200 1066.5,300 888.75,300"></polygon><polygon points="888.75,200 888.75,300 711,200"></polygon><polygon points="888.75,300 888.75,400 711,400"></polygon><polygon points="1066.5,300 1066.5,400 888.75,400"></polygon><polygon points="1422,200 1422,400 1066.5,400"></polygon><polygon points="711,200 711,0 355.5,0"></polygon><polygon points="355.5,0 355.5,200 0,200"></polygon><polygon points="355.5,200 355.5,400 0,200"></polygon><polygon points="711,400 355.5,200 711,200"></polygon><polygon points="711,600 355.5,400 355.5,600"></polygon><polygon points="355.5,600 0,400 0,600"></polygon><polygon points="355.5,800 0,800 0,600"></polygon><polygon points="355.5,800 711,600 711,800"></polygon><polygon points="1066.5,400 1422,600 1066.5,600"></polygon><polygon points="1066.5,400 888.75,500 888.75,400"></polygon><polygon points="888.75,400 888.75,500 711,400"></polygon><polygon points="888.75,500 711,600 888.75,600"></polygon><polygon points="1066.5,500 1066.5,600 888.75,600"></polygon><polygon points="711,600 1066.5,800 1066.5,600"></polygon><polygon points="1422,600 1066.5,800 1422,800"></polygon></g><g fill="hsl(220, 62%, 45%)" stroke-width="3" stroke="hsl(220, 43%, 13%)"></g></svg>
    <div className="shadow-md relative bg-white z-1 border rounded-md border-b-primary border-b-4 max-w-xl mx-auto p-6 mt-8">
      <div className="bg-emerald-50 p-4 mb-6 rounded-t-md -m-6">
        <h1 className="text-primary text-lg font-bold">GeneLinx GmbH Appointment Booking</h1>
      </div>

      <div className="space-y-4">
        {/* Amount Section */}
        <div className="flex justify-between">
          <span className="text-gray-700 text-primary font-medium">Amount</span>
          <span className="font-semibold">€249,00</span>
        </div>

        <div className="text-sm text-gray-600">
          Pay For Appointment(GL-000466)
        </div>
<Separator/>
        {/* Discount Code Section */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Discount Code"
            className="flex-1 border rounded px-3 py-2"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button className="transition-colors duration-300 hover:bg-secondary bg-emerald-700 text-white px-4 py-2 rounded">
            Apply
          </button>
        </div>

        {/* Total Section */}
        <div className="bg-neutral-100 p-6 flex justify-between font-medium">
          <span className="text-primary text-xl font-semibold">Total</span>
          <span className="text-xl font-medium text-primary">€249,00</span>
        </div>

        {/* Payment Information */}
        <div>
          <h2 className="text-teal-800 font-medium mb-4">Payment Information</h2>
          
          <div className="flex gap-8 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === 'card'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-primary"
              />
              <span className="font-bold text-primary">Card</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="ideal"
                checked={selectedPayment === 'ideal'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-teal-800"
              />
              <span className="text-primary font-bold">iDEAL</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="klarna"
                checked={selectedPayment === 'klarna'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-primary"
              />
              <span className="text-primary font-bold">Klarna</span>
            </label>
          </div>

          {/* Card Input Fields */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded px-3 py-2 pr-20"/>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                Autofill <span className="text-green-500">link</span>
              </button>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM / YY"
                className="flex-1 border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="CVV"
                className="flex-1 border rounded px-3 py-2"
              />
            </div>

            {/* Captcha Section */}
            {/* <div className="space-y-2"> */}
            {/*   <div className="bg-neutral-50 border rounded p-4 text-center italic"> */}
            {/*     6Z1DWP */}
            {/*   </div> */}
            {/*   <div className="flex gap-2"> */}
            {/*     <input */}
            {/*       type="text" */}
            {/*       placeholder="Enter the text from the image above" */}
            {/*       className="flex-1 border rounded px-3 py-2" */}
            {/*     /> */}
            {/*     <button className="text-blue-500 flex items-center gap-1"> */}
            {/*       Reload */}
            {/*     </button> */}
            {/*   </div> */}
            {/* </div> */}
            {/* Pay Button */}
            <button 
              onClick={handlePayment}
              className="w-full bg-emerald-700 text-white py-3 rounded-md hover:bg-teal-700 transition-colors">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentForm;
