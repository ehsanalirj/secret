import React, { useState } from 'react';

export default function StripePaymentBlock({ price = 10, currency = 'USD', description = 'Demo Payment', apiKey }) {
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);

  function handlePay() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
    }, 1500);
  }

  return (
    <div className="border rounded-xl p-6 bg-white shadow w-full max-w-md mx-auto">
      <div className="text-2xl font-bold text-blue-900 mb-2">Stripe Payment</div>
      <div className="mb-2 text-gray-700">{description}</div>
      <div className="mb-4 text-lg font-semibold">{currency} {price}</div>
      {paid ? (
        <div className="text-green-700 font-bold text-lg">Payment Successful! 🎉</div>
      ) : (
        <button
          className="px-6 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900 disabled:opacity-60"
          onClick={handlePay}
          disabled={processing}
        >
          {processing ? 'Processing...' : `Pay with Stripe`}
        </button>
      )}
      <div className="mt-4 text-xs text-gray-400">(Demo only, no real payment processed)</div>
    </div>
  );
}
