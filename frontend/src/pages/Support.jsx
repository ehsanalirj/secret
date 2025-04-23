import React from "react";

export default function Support() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">Support & Contact</h1>
      <p className="text-lg text-gray-700 mb-8">We’re here to help. Reach out for technical support, onboarding, or to talk to our sales team.</p>
      <div className="bg-white rounded-2xl shadow p-8 mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Contact Support</h2>
        <p className="mb-3">Email: <a href="mailto:support@vontres.com" className="text-blue-700 underline">support@vontres.com</a></p>
        <p>Live Chat: <span className="text-blue-700">[Coming soon]</span></p>
      </div>
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Talk to Sales</h2>
        <p>Email: <a href="mailto:sales@vontres.com" className="text-blue-700 underline">sales@vontres.com</a></p>
        <p>Request a personalized demo: <a href="/demo" className="text-blue-700 underline">Book here</a></p>
      </div>
    </main>
  );
}
