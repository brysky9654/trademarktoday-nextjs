import TMCheckLayout from '../layout/TMCheckLayout';
import { Alert3 } from '@/components/AlertContainers';
import { Context, User } from '@/types/interface';
import ServerSidePropsAuthorized from '@/layout/ServerSidePropsAuthorized';
import Chat from '@/components/Chat';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_51NRavWKg82trmtxxJorSiVWsfdHTbKTNkflXdbnZKfX7OjYADAnntoRiTNj8zBVMfFAQfeQCnP9e2OZrWG8cEa4k00T7eN4YYy'
const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

import { useContext, useEffect, useState } from 'react';
import { PiniaStore } from '@/store/store';
import axios from 'axios';
const Checkout = ({ user }: { user: User }) => {
  const { pinia, setPinia } = useContext(PiniaStore);
  const [price, setPrice] = useState(0)
  useEffect(() => {
    if ((pinia?.classes !== undefined && !(Object.keys(pinia.classes).length === 0 && pinia.classes.constructor === Object))) {
      setPrice((Object.keys(pinia.classes).length * 590 - (Object.keys(pinia.classes).length - 1) * 100))
    }
  }, [pinia])
  const handlePay = async () => {
    if (!price || price === 0) return;
    const stripe = await stripePromise;
    const { data: { id } } = await axios.post('/api/create-checkout-session', { price: price + 200 }); console.log(id)
    // const session = await response.json(); console.log(session)
    const result = await stripe?.redirectToCheckout({ sessionId: id });

    if (result?.error) {
      // Handle error
      console.error(result.error.message);
    }
  };
  return (
    <>
      <main className='max-w-7xl mx-auto px-6 py-4'>
        <div className="grid gap-y-6">
          <div className='flex w-full justify-center'>
            <div className='flex flex-col gap-6 w-[600px] p-10 font-mont rounded-2xl bg-white shadow-[0_2px_10px_#00000040]  justify-center items-center'>
              <h1 className='text-7xl text-red-500'>{(price + 200).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
              <h2 className='text-2xl'>For Trade Mark Filing</h2>
              <div className='flex flex-col justify-start w-72 gap-4 '>
                <h4><span className='bg-green-600 inline-block p-1 py-0 mx-1 text-white'>&#10003;</span> For basic cost {price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </h4>
                <h4><span className='bg-green-600 inline-block p-1 py-0 mx-1 text-white'>&#10003;</span> Expedite Examination $90.00 </h4>
                <h4><span className='bg-green-600 inline-block p-1 py-0 mx-1 text-white'>&#10003;</span> Use Trade Mark Today&apos;s address as Owner&apos;s address $20.00</h4>
                <h4><span className='bg-green-600 inline-block p-1 py-0 mx-1 text-white'>&#10003;</span> Pre-filing review by an Australia Registered Trade Mark Attorney	$90.00</h4>
              </div>
              <button onClick={handlePay} className='flex justify-center items-center text-white font-mont w-48 h-16 text-2xl rounded-md shadow-[0_2px_10px_#00000040] [text-shadow:_1px_3px_5px_rgb(0_0_0_/_100%)] transition-all ease-in-out duration-1000 bg-gradient-to-t from-amber-400 to-amber-700 border hover:border-black'>Checkout</button>
            </div>
          </div>
        </div>
      </main>
      <Chat />
    </>
  )
}
Checkout.getLayout = TMCheckLayout;
export const getServerSideProps = ServerSidePropsAuthorized;
export default Checkout;