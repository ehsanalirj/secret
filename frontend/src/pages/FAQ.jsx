import React from "react";

export default function FAQ() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl">Find answers to common questions. Need more help? <a href='/support' className='text-blue-700 underline'>Contact Support</a> or <a href='/support' className='text-blue-700 underline'>Talk to Sales</a>.</p>
      {/* FAQ list will go here */}
      <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">[FAQ content coming soon]</div>
    </main>
  );
}
