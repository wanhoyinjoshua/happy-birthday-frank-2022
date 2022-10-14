import React, { useState, useEffect } from 'react';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import { userAgent } from 'next/server';
import Link from "next/link"
const ProductDisplay = () => (
  <section>
      <button
    className="rounded-l-md border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75"
    type="button"
  >
    <Link href="/Example">Back to dashboard</Link>
  </button>
    <div className="relative rounded-lg border border-gray-200 p-8 text-center">
  <h2 className="text-2xl font-medium">Basic plan</h2>

  <p className="mt-4 text-sm text-gray-500">
    It includes bbablabl ,, 5 AUD /month
  </p>

  <a
    href=""
    className="mt-8 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500"
  >
     <form action="/api/create-checkout-session" method="POST">
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type="hidden" name="lookup_key" value="frankbasic" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="ml-3 h-4 w-4 flex-shrink-0"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </a>
</div>

   
  </section>
);

const SuccessDisplay = ({ sessionId }) => {
  return (
    <>


    <section>
      
      <div className="product Box-root">
       
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/api/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          
        />
           <button

className="bg-blue-500 rounded-l-md border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75" id="checkout-and-portal-button"
    
    type="button"
  >
    <Link href="/Example">Back to dashboard</Link>
  </button>
        <button className="rounded-l-md border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75" id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
    </>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const { user } = useUser();
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);