import React, { useState } from 'react';
import SubmitBlockModal from './SubmitBlockModal';
import StripePaymentBlock from '../blocks/StripePaymentBlock';
import AnalyticsDashboardBlock from '../blocks/AnalyticsDashboardBlock';
import MailchimpSignupBlock from '../blocks/MailchimpSignupBlock';
import AirtableTableBlock from '../blocks/AirtableTableBlock';
import AIPersonalizedRecommendations from './AIPersonalizedRecommendations';
import BlockReviewSection from './BlockReviewSection';
import BlockAnalyticsDashboard from './BlockAnalyticsDashboard';
import BlockAnalyticsCharts from './BlockAnalyticsCharts';
import ExportAnalyticsButton from './ExportAnalyticsButton';
import FlaggedReviewsPanel from './FlaggedReviewsPanel';
import RealtimeAnalyticsBanner from './RealtimeAnalyticsBanner';

const DEMO_BLOCKS = [
  { id: 1, name: 'Testimonial Slider', desc: 'A modern testimonial carousel with avatars.', preview: '🧑‍🤝‍🧑', installs: 49, rating: 5, community: false },
  { id: 2, name: 'Pricing Table', desc: 'Responsive pricing table with 3 tiers.', preview: '💸', installs: 38, rating: 4.9, community: false },
  { id: 3, name: 'Contact Form', desc: 'Accessible contact form with validation.', preview: '📧', installs: 56, rating: 5, community: false },
  { id: 4, name: 'Gallery Grid', desc: 'Image gallery with lightbox.', preview: '🖼️', installs: 41, rating: 4.8, community: false },
  { id: 5, name: 'Stripe Payment', desc: 'Accept payments with Stripe. Demo block.', preview: '💳', installs: 21, rating: 5, community: false, isStripe: true },
  { id: 6, name: 'Analytics Dashboard', desc: 'View Google Analytics stats. Demo block.', preview: '📊', installs: 33, rating: 5, community: false, isAnalytics: true },
  { id: 7, name: 'Mailchimp Signup', desc: 'Newsletter signup form. Demo block.', preview: '📧', installs: 27, rating: 5, community: false, isMailchimp: true },
  { id: 8, name: 'Airtable Table', desc: 'Show Airtable data in a table. Demo block.', preview: '📋', installs: 19, rating: 5, community: false, isAirtable: true },
];

export default function CommunityBlockMarketplacePanel() {
  const [blocks, setBlocks] = useState(DEMO_BLOCKS);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [showStripeDemo, setShowStripeDemo] = useState(false);
  const [showAnalyticsDemo, setShowAnalyticsDemo] = useState(false);
  const [showMailchimpDemo, setShowMailchimpDemo] = useState(false);
  const [showAirtableDemo, setShowAirtableDemo] = useState(false);

  function handleInstall(id) {
    setBlocks(blocks => blocks.map(b => b.id === id ? { ...b, installs: b.installs + 1 } : b));
    const block = blocks.find(b => b.id === id);
    if (block && block.isStripe) setShowStripeDemo(true);
    if (block && block.isAnalytics) setShowAnalyticsDemo(true);
    if (block && block.isMailchimp) setShowMailchimpDemo(true);
    if (block && block.isAirtable) setShowAirtableDemo(true);
    // TODO: Actually add the block to the builder's block library
  }

  function handleSubmitBlock({ name, desc, preview }) {
    setBlocks(blocks => [
      ...blocks,
      {
        id: Date.now(),
        name,
        desc,
        preview,
        installs: 1 + Math.floor(Math.random() * 10),
        rating: 5,
        community: true
      }
    ]);
  }

  return (
    <div className="p-8">
      <AIPersonalizedRecommendations onInstall={handleInstall} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Community Block Marketplace</h2>
        <button className="px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900" onClick={() => setSubmitOpen(true)}>
          + Submit Block
        </button>
      </div>
      <RealtimeAnalyticsBanner />
      <ExportAnalyticsButton blocks={blocks} />
      <BlockAnalyticsDashboard blocks={blocks} />
      <FlaggedReviewsPanel />
      <BlockAnalyticsCharts blocks={blocks} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocks.map(block => (
          <div key={block.id} className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{block.preview}</span>
              <span className="font-bold text-blue-900 text-lg">{block.name}</span>
              {block.installs >= 50 && <span className="ml-2 px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-bold">Most Used</span>}
              {block.installs >= 30 && block.installs < 50 && <span className="ml-2 px-2 py-0.5 rounded bg-pink-100 text-pink-800 text-xs font-bold">Trending</span>}
              {block.rating >= 5 && block.installs >= 20 && <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-bold">Top Rated</span>}
              {block.community && <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-bold">Community</span>}
            </div>
            <div className="text-gray-700 text-xs mb-1">{block.desc}</div>
            <div className="flex gap-2 text-xs mb-2">
              <span>⭐ {block.rating}</span>
              <span>⬇️ {block.installs}</span>
            </div>
            <button className="px-3 py-1 rounded bg-blue-700 text-white font-bold hover:bg-blue-900 text-xs w-fit" onClick={() => handleInstall(block.id)}>
              Install
            </button>
            <BlockReviewSection
              blockId={block.id}
              reviews={block.id === 5 ? [
                { id: 1, author: 'Alex', comment: 'Super easy to use and works perfectly for Stripe payments!', rating: 5, date: '2025-04-20' },
                { id: 2, author: 'Samira', comment: 'Love the UI, was able to accept demo payments in seconds.', rating: 5, date: '2025-04-21' }
              ] : []}
            />
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-700">
              <span>⬇️ Installs: <b>{block.installs}</b></span>
              <span>⭐ Avg. Rating: <b>{block.rating}</b></span>
              <span>📝 Reviews: <b>{block.id === 5 ? 2 : 0}</b></span>
            </div>
          </div>
        ))}
      </div>
      <SubmitBlockModal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onSubmit={handleSubmitBlock}
      />
      {showStripeDemo && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-blue-900">Stripe Payment Block Demo</h3>
          <StripePaymentBlock price={25} currency="USD" description="Demo Product" />
        </div>
      )}
      {showAnalyticsDemo && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-blue-900">Analytics Dashboard Block Demo</h3>
          <AnalyticsDashboardBlock trackingId="UA-12345678-9" />
        </div>
      )}
      {showMailchimpDemo && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-blue-900">Mailchimp Signup Block Demo</h3>
          <MailchimpSignupBlock audience="Demo Audience" />
        </div>
      )}
      {showAirtableDemo && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-blue-900">Airtable Table Block Demo</h3>
          <AirtableTableBlock baseId="DemoBase" tableName="Contacts" />
        </div>
      )}
    </div>
  );
}
