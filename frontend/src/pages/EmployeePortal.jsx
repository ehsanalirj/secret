import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

import OnboardingChecklist from './OnboardingChecklist.jsx';
const TABS = [
  { key: 'profile', label: 'My Profile' },
  { key: 'salary', label: 'Salary Slips' },
  { key: 'provident', label: 'Provident Fund' },
  { key: 'leaves', label: 'Leaves' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'documents', label: 'Documents' },
  { key: 'contact', label: 'Contact HR' },
];

export default function EmployeePortal() {
  const [tab, setTab] = useState('profile');
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Employee Portal</h2>
      <div className="flex gap-2 mb-4 justify-center">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`px-4 py-2 rounded ${tab === t.key ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'profile' && <ProfileTab />}
      {tab === 'salary' && <SalaryTab />}
      {tab === 'provident' && <ProvidentTab />}
      {tab === 'leaves' && <LeavesTab />}
      {tab === 'onboarding' && <OnboardingChecklist />}
      {tab === 'documents' && <DocumentsTab />}
      {tab === 'contact' && <ContactHRTab />}
    </div>
  );
}

function ProfileTab() {
  const [profile, setProfile] = useState(null);
  useEffect(() => { apiFetch('/employee-portal/me').then(setProfile); }, []);
  if (!profile) return <div>Loading...</div>;
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="font-bold text-xl mb-2">{profile.name}</div>
      <div>Email: {profile.email}</div>
      <div>Phone: {profile.phone || '-'}</div>
      <div>Address: {profile.address || '-'}</div>
      <div>Role: {profile.role}</div>
      <div>Department: {profile.department || '-'}</div>
      <div>Status: {profile.status}</div>
      <div>Start Date: {profile.startDate ? new Date(profile.startDate).toLocaleDateString() : '-'}</div>
    </div>
  );
}

function SalaryTab() {
  const [slips, setSlips] = useState([]);
  useEffect(() => { apiFetch('/employee-portal/me/salary-slips').then(setSlips); }, []);
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="font-bold mb-2">Salary Slips</div>
      <ul>
        {slips.length === 0 && <li>No salary slips available.</li>}
        {slips.map(slip => (
          <li key={slip.url} className="mb-2 flex gap-2 items-center">
            <span>{slip.month} {slip.year}</span>
            <a href={slip.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProvidentTab() {
  const [fund, setFund] = useState(null);
  useEffect(() => { apiFetch('/employee-portal/me/provident').then(setFund); }, []);
  if (!fund) return <div>Loading...</div>;
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="font-bold mb-2">Provident Fund</div>
      <div>Account: {fund.accountNumber || '-'}</div>
      <div>Balance: {fund.balance ? `₨${fund.balance.toLocaleString()}` : '-'}</div>
      <div className="mt-2 font-semibold">Contributions:</div>
      <ul>
        {(!fund.contributions || fund.contributions.length === 0) && <li>No contributions.</li>}
        {fund.contributions && fund.contributions.map((c,i) => (
          <li key={i}>{c.amount} on {new Date(c.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

function LeavesTab() {
  const [leaves, setLeaves] = useState([]);
  useEffect(() => { apiFetch('/employee-portal/me/leaves').then(setLeaves); }, []);
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="font-bold mb-2">My Leaves</div>
      <ul>
        {leaves.length === 0 && <li>No leaves found.</li>}
        {leaves.map((l,i) => (
          <li key={i}>{l.type} from {new Date(l.from).toLocaleDateString()} to {new Date(l.to).toLocaleDateString()} - {l.status}</li>
        ))}
      </ul>
    </div>
  );
}

function DocumentsTab() {
  const [docs, setDocs] = useState([]);
  useEffect(() => { apiFetch('/employee-portal/me/documents').then(setDocs); }, []);
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="font-bold mb-2">My Documents</div>
      <ul>
        {docs.length === 0 && <li>No documents found.</li>}
        {docs.map((d,i) => (
          <li key={i}><a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{d.name}</a> ({new Date(d.uploadedAt).toLocaleDateString()})</li>
        ))}
      </ul>
    </div>
  );
}

function ContactHRTab() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    await apiFetch('/employee-portal/me/contact-hr', {
      method: 'POST',
      body: JSON.stringify({ subject, message }),
    });
    setSent(true);
    setSubject('');
    setMessage('');
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-2">
      <div className="font-bold mb-2">Contact HR</div>
      <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required className="border p-2 rounded" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" required className="border p-2 rounded resize-none" rows={3} />
      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded self-start">Send</button>
      {sent && <div className="text-green-700">Message sent to HR!</div>}
    </form>
  );
}
