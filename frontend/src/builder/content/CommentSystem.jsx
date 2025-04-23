import React, { useState, useEffect } from 'react';

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatTime(ts) {
  return new Date(ts).toLocaleString();
}

export default function CommentSystem() {
  const [comments, setComments] = useState(() => {
    const saved = window.localStorage.getItem('vontres_comments');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [name, setName] = useState('Guest');
  const [replyTo, setReplyTo] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionCandidates, setMentionCandidates] = useState([]);
  const [toast, setToast] = useState(null);

  // For mentions: collect all unique names from comments
  const allNames = Array.from(new Set(comments.map(c => c.name).filter(n => n && n !== name)));

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    window.localStorage.setItem('vontres_comments', JSON.stringify(comments));
  }, [comments]);

  function addComment() {
    if (!input.trim()) return;
    if (editing !== null) {
      setComments(comments => comments.map(c => c.id === editing ? { ...c, text: editText } : c));
      setEditing(null); setEditText(''); setInput('');
      return;
    }
    const newComment = {
      id: Date.now() + Math.random(),
      name,
      text: input,
      time: Date.now(),
      replyTo,
    };
    setComments(comments => [...comments, newComment]);
    setInput(''); setReplyTo(null);
    // Mention notification
    const mentionMatches = input.match(/@([\w\s]+)/g) || [];
    mentionMatches.forEach(m => {
      const mentioned = m.slice(1).trim();
      if (mentioned && mentioned === name) {
        setToast('You were mentioned in a comment!');
      }
    });
  }
  function deleteComment(id) {
    setComments(comments => comments.filter(c => c.id !== id && c.replyTo !== id));
  }
  function startEdit(c) {
    setEditing(c.id); setEditText(c.text); setInput('');
  }
  function startReply(id) {
    setReplyTo(id); setInput('');
  }
  function cancelEdit() {
    setEditing(null); setEditText('');
  }
  function cancelReply() {
    setReplyTo(null); setInput('');
  }
  const renderComments = (parentId = null, level = 0) => comments.filter(c => c.replyTo === parentId).map(c => (
    <div key={c.id} className={`flex gap-2 mb-3 ml-${level*6}`}>
      <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg">{getInitials(c.name)}</div>
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg px-4 py-2">
          <div className="font-semibold text-blue-900">{c.name} <span className="text-xs text-gray-400 ml-2">{formatTime(c.time)}</span></div>
          <div className="text-gray-800 whitespace-pre-line">{editing === c.id ? (
            <>
              <textarea
                className="w-full border px-2 py-1 rounded mt-1"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2 mt-1">
                <button className="px-2 py-1 rounded bg-blue-600 text-white text-xs" onClick={addComment} title="Save edit">Save</button>
                <button className="px-2 py-1 rounded bg-gray-200 text-xs" onClick={cancelEdit} title="Cancel edit">Cancel</button>
              </div>
            </>
          ) : highlightMentions(c.text, allNames)}</div>
        </div>
        <div className="flex gap-2 mt-1 text-xs text-blue-700">
          <button className="hover:underline" onClick={() => startReply(c.id)} title="Reply to comment">Reply</button>
          <button className="hover:underline" onClick={() => startEdit(c)} title="Edit comment">Edit</button>
          <button className="hover:underline text-red-700" onClick={() => deleteComment(c.id)} title="Delete comment">Delete</button>
        </div>
        {renderComments(c.id, level + 1)}
      </div>
    </div>
  ));

  function handleInputChange(e) {
    const val = e.target.value;
    setInput(val);
    // Detect @mention
    const match = val.match(/@([\w\s]*)$/);
    if (match) {
      setMentionQuery(match[1]);
      setMentionCandidates(allNames.filter(n => n.toLowerCase().includes(match[1].toLowerCase())));
      setShowMentionList(true);
    } else {
      setShowMentionList(false);
    }
  }
  function handleMentionSelect(n) {
    const before = input.replace(/@([\w\s]*)$/, `@${n} `);
    setInput(before);
    setShowMentionList(false);
  }
  function highlightMentions(text, names) {
    if (!text) return '';
    let out = text;
    names.forEach(n => {
      out = out.replace(new RegExp(`@${n}(?![\w])`, 'g'), `<span class="bg-yellow-200 text-blue-900 font-bold rounded px-1">@${n}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: out }} />;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Comment System</h2>
      {toast && <div className="fixed top-4 right-4 bg-blue-700 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">{toast}</div>}
      <div className="mb-4 flex gap-2 items-center">
        <input
          className="border px-2 py-1 rounded w-32"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          title="Your display name"
        />
        <textarea
          className="border px-2 py-1 rounded flex-1"
          value={input}
          onChange={handleInputChange}
          placeholder={replyTo ? "Write a reply..." : "Write a comment... (use @ to mention)"}
          rows={2}
          title="Write your comment (use @ to mention)"
        />
        <button
          className="px-3 py-1 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
          onClick={addComment}
          title="Post comment"
        >{editing !== null ? 'Save' : replyTo ? 'Reply' : 'Post'}</button>
        {(editing !== null || replyTo !== null) && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={editing !== null ? cancelEdit : cancelReply}
            title="Cancel"
          >Cancel</button>
        )}
      </div>
      {showMentionList && mentionCandidates.length > 0 && (
        <div className="absolute bg-white border rounded shadow-lg mt-1 z-50 max-h-32 overflow-y-auto">
          {mentionCandidates.map(n => (
            <div
              key={n}
              className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleMentionSelect(n)}
            >@{n}</div>
          ))}
        </div>
      )}
          placeholder={editing !== null ? "Edit your comment..." : replyTo !== null ? "Reply..." : "Add a comment..."}
          value={editing !== null ? editText : input}
          onChange={e => editing !== null ? setEditText(e.target.value) : setInput(e.target.value)}
          rows={2}
        />
        <button
          className="px-4 py-1 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
          onClick={addComment}
        >{editing !== null ? "Save" : replyTo !== null ? "Reply" : "Comment"}</button>
        {(editing !== null || replyTo !== null) && (
          <button className="px-3 py-1 rounded bg-gray-200" onClick={editing !== null ? cancelEdit : cancelReply}>Cancel</button>
        )}
      <div className="space-y-2">
        {renderComments()}
      </div>
    </div>
  );
}
