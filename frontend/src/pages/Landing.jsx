import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, GlobeAltIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/solid';
import Lottie from 'lottie-react';
import heroAnimation from '../assets/hero-animation.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const features = [
  {
    icon: <SparklesIcon className="w-8 h-8 text-blue-600" />,
    title: 'Online Ordering & Delivery',
    desc: 'Seamless web/mobile ordering, real-time menu, and delivery tracking.'
  },
  {
    icon: <UserGroupIcon className="w-8 h-8 text-green-600" />,
    title: 'HR & Employee Portal',
    desc: 'Onboarding, payroll, leaves, docs, assessments, and more.'
  },
  {
    icon: <ChartBarIcon className="w-8 h-8 text-purple-600" />,
    title: 'Analytics & Insights',
    desc: 'Live dashboards, sales, marketing, and sustainability analytics.'
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8 text-pink-600" />,
    title: 'Multi-location Ready',
    desc: 'Scale from single store to global franchise with ease.'
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8 text-yellow-600" />,
    title: 'Enterprise Security',
    desc: 'Role-based access, audit logs, compliance, and integrations.'
  },
  {
    icon: <BoltIcon className="w-8 h-8 text-red-600" />,
    title: 'Lightning Fast',
    desc: 'Modern cloud infrastructure for blazing speed and reliability.'
  }
];

const customerLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4e/Dell_Logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/6/62/Twitter_Bird.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
];

const testimonials = [
  { name: 'Sarah L.', company: 'Urban Eats', quote: 'VONTRES transformed our online ordering—sales up 30% in 2 months!', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mike D.', company: 'Pasta House', quote: 'The website builder is a game changer. Our site looks amazing and we did it all in-house.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Alicia K.', company: 'Vegan Vibes', quote: 'Super fast, beautiful, and easy for my whole team. Highly recommended!', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-black transition-colors duration-300">
      {/* Notion-style Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight font-sans text-black">VONTRES</span>
        </div>
        <div className="hidden md:flex gap-6 text-base font-medium text-gray-700">
          <a href="/features" className="hover:text-black">Product</a>
          <a href="/solutions" className="hover:text-black">Teams</a>
          <a href="#" className="hover:text-black">Individuals</a>
          <a href="/pricing" className="hover:text-black">Pricing</a>
        </div>
        <div className="flex gap-2 items-center">
          <a href="#" className="hidden md:inline text-gray-700 hover:text-black px-3 py-1 rounded transition">Request a demo</a>
          <a href="/login" className="text-gray-700 hover:text-black px-3 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-blue-600" aria-label="Go to login page">Log in</a>
          <a href="/get-started" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transition shadow-none">Get Started</a>
        </div>
      </nav>

      <style>{`
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Poppins', 'Inter', 'Segoe UI', Arial, sans-serif; letter-spacing: -0.01em; }
        .font-sans { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
      `}</style>
      {/* Hero Section */}
      {/* Notion-style Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 pt-20 pb-12 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col items-start gap-6 z-10 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.08] text-black mb-2 font-sans">The happier workspace</h1>
          <p className="text-xl text-gray-700 mb-6 font-normal">Write. Plan. Collaborate. With a little help from AI.</p>
          <div className="flex gap-3">
            <a href="/get-started" className="px-7 py-3 rounded bg-blue-600 text-white font-bold text-lg shadow-none hover:bg-blue-700 transition">Get VONTRES free</a>
            <a href="#" className="px-7 py-3 rounded bg-gray-100 text-black font-bold text-lg border border-gray-300 hover:bg-gray-200 transition">Request a demo</a>
          </div>
          {/* Trusted by bar */}
          <div className="mt-10">
            <div className="text-sm text-gray-500 mb-2">Trusted by teams at</div>
            <div className="flex gap-6 items-center grayscale opacity-80">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Toyota_logo.png" alt="Toyota" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/OpenAI_Logo.svg" alt="OpenAI" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Ramp_logo.svg" alt="Ramp" className="h-6" />
            </div>
          </div>
        </div>
        {/* Notion-style SVG Illustration */}
        <div className="flex-1 flex items-center justify-center w-full md:w-auto mt-10 md:mt-0">
          <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=640/front-static/pages/home/ai-hero-illustration-V2.png" alt="Notion-style Illustration" className="w-full max-w-lg md:max-w-xl" />
        </div>
      </section>


      {/* Customer Logos */}
      <section className="relative z-10 max-w-3xl mx-auto py-4 flex flex-wrap items-center justify-center gap-8 animate-fade-in-up delay-400">
        {customerLogos.map((logo, idx) => (
          <img key={idx} src={logo} alt="Customer Logo" className="h-10 grayscale hover:grayscale-0 transition duration-300" />
        ))}
      </section>
      {/* Premium VONTRES Features (Notion-style) */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 pb-24">
        {/* Feature: Global Menu Management */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">🌎 Global Menu Management</span>
          <span className="text-gray-600 text-base">Centrally manage menus, pricing, and localization for all your restaurants—anywhere in the world.</span>
        </div>
        {/* Feature: Multi-location Analytics */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">📊 Multi-location Analytics</span>
          <span className="text-gray-600 text-base">Real-time dashboards and reporting across every location, region, and brand.</span>
        </div>
        {/* Feature: AI-Powered Forecasting */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">🤖 AI-Powered Forecasting</span>
          <span className="text-gray-600 text-base">Predict demand, optimize inventory, and maximize revenue with advanced machine learning.</span>
        </div>
        {/* Feature: Integrated Delivery & POS */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">🚚 Integrated Delivery & POS</span>
          <span className="text-gray-600 text-base">Seamless integration with all major delivery platforms and in-house POS systems.</span>
        </div>
        {/* Feature: Enterprise Security */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">🔒 Enterprise Security</span>
          <span className="text-gray-600 text-base">Bank-grade encryption, role-based access, and global compliance for peace of mind.</span>
        </div>
        {/* Feature: Staff Scheduling & Payroll */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">🗓️ Staff Scheduling & Payroll</span>
          <span className="text-gray-600 text-base">Automate scheduling, attendance, and payroll for teams of any size, anywhere.</span>
        </div>
        {/* Feature: Real-time Inventory */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">📦 Real-time Inventory</span>
          <span className="text-gray-600 text-base">Track stock, reduce waste, and automate reordering—across every location.</span>
        </div>
        {/* Feature: Mobile Ordering */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">📱 Mobile Ordering</span>
          <span className="text-gray-600 text-base">Delight guests with branded web/mobile ordering and contactless payments.</span>
        </div>
        {/* Feature: Customer Loyalty & CRM */}
        <div className="flex flex-col gap-3 items-start p-0">
          <span className="text-2xl font-semibold text-black">💎 Customer Loyalty & CRM</span>
          <span className="text-gray-600 text-base">Drive repeat business with global loyalty programs, offers, and advanced guest insights.</span>
        </div>
      </section>
      {/* AI Analytics Section */}
      <section id="ai-analytics" className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 py-12 animate-fade-in-up delay-600">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-4">AI-Powered Insights at Your Fingertips</h2>
          <p className="text-lg text-[var(--primary)]/80 mb-6">Our AI-driven analytics help you optimize operations, delight customers, and grow your business with actionable insights.</p>
          <ul className="list-disc list-inside text-[var(--primary)]/90 space-y-2 text-left">
            <li>Dynamic forecasting and trend analysis</li>
            <li>Customer behavior and feedback analytics</li>
            <li>Menu optimization and waste reduction</li>
            <li>Real-time sales and performance dashboards</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {/* Animated analytics mockup */}
          <div className="w-72 h-52 bg-gradient-to-tr from-[var(--accent)] to-[var(--muted)] rounded-2xl shadow-2xl flex items-center justify-center border-4 border-[var(--accent)] relative overflow-hidden">
            <img src="https://assets-global.website-files.com/5f7cdd1c6a5f2d1c1d8b4570/63e3d1d2e2c5d3f8f8e9d1c6_dashboard-analytics-p-800.png" alt="AI Analytics Mockup" className="w-full h-full object-cover opacity-90" />
          </div>
        </div>
      </section>
      {/* Interactive FAQ Section (Dialogue) */}
      <section id="faq" className="max-w-3xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#18181b] mb-10 text-center">How VONTRES Solves Real Restaurant Problems</h2>
        <div className="space-y-8">
          {/* Example Dialogue 1 */}
          <div className="flex flex-col gap-2">
            <div className="self-start bg-gray-100 text-[#18181b] px-5 py-3 rounded-xl max-w-xl"><b>Restaurant:</b> How do I manage menus and pricing for dozens of locations?</div>
            <div className="self-end bg-blue-50 text-blue-900 px-5 py-3 rounded-xl max-w-xl"><b>VONTRES:</b> Instantly update menus, prices, and availability across all your brands, regions, and stores—globally, from a single dashboard.</div>
          </div>
          {/* Example Dialogue 2 */}
          <div className="flex flex-col gap-2">
            <div className="self-start bg-gray-100 text-[#18181b] px-5 py-3 rounded-xl max-w-xl"><b>Restaurant:</b> Can I see real-time sales and inventory for every location?</div>
            <div className="self-end bg-blue-50 text-blue-900 px-5 py-3 rounded-xl max-w-xl"><b>VONTRES:</b> Yes! Track sales, stock, and performance live—no more spreadsheets or waiting for reports.</div>
          </div>
          {/* Example Dialogue 3 */}
          <div className="flex flex-col gap-2">
            <div className="self-start bg-gray-100 text-[#18181b] px-5 py-3 rounded-xl max-w-xl"><b>Restaurant:</b> How do I handle compliance, taxes, and audits?</div>
            <div className="self-end bg-blue-50 text-blue-900 px-5 py-3 rounded-xl max-w-xl"><b>VONTRES:</b> VONTRES automates compliance and tax calculations for every region, and provides audit-ready logs for peace of mind.</div>
          </div>
          {/* Example Dialogue 4 */}
          <div className="flex flex-col gap-2">
            <div className="self-start bg-gray-100 text-[#18181b] px-5 py-3 rounded-xl max-w-xl"><b>Restaurant:</b> Can I customize the system for my franchisees and brands?</div>
            <div className="self-end bg-blue-50 text-blue-900 px-5 py-3 rounded-xl max-w-xl"><b>VONTRES:</b> Absolutely! Give each brand or franchisee their own experience, while you keep global control and oversight.</div>
          </div>
        </div>
      </section>
      {/* Wishlist Section */}
      <section id="wishlist" className="max-w-2xl mx-auto px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#18181b] mb-6 text-center">Wishlist</h2>
        <p className="text-center text-gray-500 mb-4">Suggest a feature you’d love to see in VONTRES:</p>
        <form className="flex gap-2 justify-center">
          <input type="text" placeholder="Your idea…" className="flex-1 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none" />
          <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Submit</button>
        </form>
      </section>
      {/* Simple Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} VONTRES. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
