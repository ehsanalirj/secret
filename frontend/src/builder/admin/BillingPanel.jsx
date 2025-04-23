import React from 'react';

export default function BillingPanel() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Billing & Subscription</h2>
      <p className="text-blue-800 mb-4">Manage your subscription, billing history, and invoices. (Upgrade, payment methods, and usage analytics coming soon.)</p>
      <div className="bg-white rounded-xl shadow p-6">No billing info yet. Add your payment method!</div>
    </div>
  );
}
