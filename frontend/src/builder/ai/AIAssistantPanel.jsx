import React from 'react';

export default function AIAssistantPanel() {
  const [messages, setMessages] = React.useState([
    { from: 'ai', text: '👋 Hi! I can help with copywriting, SEO, color palettes, accessibility, and more. How can I assist you today?' }
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const chatRef = React.useRef();

  function sendMessage(text) {
    setMessages(msgs => [...msgs, { from: 'user', text }]);
    setLoading(true);
    setTimeout(() => {
      // Mock AI response
      setMessages(msgs => [...msgs, { from: 'ai', text: getMockAIResponse(text) }]);
      setLoading(false);
      setTimeout(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 100);
    }, 900);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  }
  function handleQuickSuggest(type) {
    let q = '';
    if (type === 'copy') q = 'Write a catchy headline for my homepage.';
    if (type === 'seo') q = 'Suggest SEO keywords for a travel blog.';
    if (type === 'color') q = 'Suggest a color palette for a tech startup.';
    if (type === 'onboard') q = 'How do I get started with this builder?';
    sendMessage(q);
  }
  return (
    <div className="p-8 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
      <div className="flex gap-2 mb-4 flex-wrap">
        <button className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs" onClick={() => handleQuickSuggest('copy')}>Copywriting</button>
        <button className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs" onClick={() => handleQuickSuggest('seo')}>SEO</button>
        <button className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs" onClick={() => handleQuickSuggest('color')}>Color Palette</button>
        <button className="px-3 py-1 rounded bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs" onClick={() => handleQuickSuggest('onboard')}>Onboarding Help</button>
      </div>
      <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-4 mb-4" ref={chatRef} style={{ minHeight: 200, maxHeight: 400 }}>
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.from === 'ai' ? '' : 'justify-end'}`}>
            <div className={`px-3 py-2 rounded-lg max-w-[80%] shadow ${m.from === 'ai' ? 'bg-blue-50 text-blue-900' : 'bg-blue-600 text-white'}`}>{m.text}</div>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400">AI Assistant is typing...</div>}
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit} autoComplete="off">
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-blue-400"
          placeholder="Ask me anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Ask AI Assistant"
        />
        <button className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition" type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}

function getMockAIResponse(text) {
  text = text.toLowerCase();
  if (text.includes('headline')) return 'How about: "Unleash Your Creativity with VONTRES Builder!"';
  if (text.includes('seo')) return 'Try keywords: "travel, adventure, destinations, blog, guide, explore"';
  if (text.includes('color')) return 'Palette: #1E3A8A (blue), #F59E42 (orange), #F1F5F9 (light), #111827 (dark)';
  if (text.includes('onboard') || text.includes('get started')) return 'Start by choosing a template, then add blocks and customize content. Use the sidebar to access all builder features!';
  if (text.includes('accessibility')) return 'Use clear labels, sufficient color contrast, and keyboard navigation for best accessibility.';
  return 'Sorry, I can only help with copywriting, SEO, color, accessibility, and onboarding for now.';
}
