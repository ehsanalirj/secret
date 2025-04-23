import React, { useState, useEffect } from 'react';

import RichTextEditor from './RichTextEditor';

function BlogEditorModal({ open, onClose, onSave, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setContent(initialData?.content || '');
  }, [initialData]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h3 className="font-bold text-lg mb-4">{initialData ? 'Edit Post' : 'New Post'}</h3>
        <input
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <RichTextEditor value={content} onChange={setContent} />
        <div className="flex justify-end gap-2 mt-2">
          <Tooltip text="Cancel editing">
            <button className="px-4 py-1 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          </Tooltip>
          <Tooltip text="Save the post">
            <button
              className="px-4 py-1 rounded bg-blue-600 text-white font-bold"
              aria-label="Save post"
              onClick={() => {
                if (title.trim()) onSave({ title, content });
              }}
            >Save</button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default function BlogManager() {
  const [posts, setPosts] = useState(() => {
    const saved = window.localStorage.getItem('vontres_blog_posts');
    return saved ? JSON.parse(saved) : [];
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('vontres_blog_posts', JSON.stringify(posts));
  }, [posts]);

  const openEditor = (idx = null) => {
    setEditIndex(idx);
    setEditorOpen(true);
  };
  const closeEditor = () => {
    setEditorOpen(false);
    setEditIndex(null);
  };
  const savePost = (data) => {
    if (editIndex !== null) {
      setPosts(posts => posts.map((p, i) => i === editIndex ? { ...p, ...data } : p));
    } else {
      setPosts(posts => [...posts, { ...data, date: new Date().toISOString() }]);
    }
    closeEditor();
  };
  const confirmDelete = idx => setDeleteIndex(idx);
  const doDelete = () => {
    setPosts(posts => posts.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Blog Manager</h2>
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
          onClick={() => openEditor()}
          title="Create a new blog post"
        >
          + New Post
        </button>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          onClick={() => {
            const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blog-posts.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
          title="Export all blog posts as JSON"
        >
          Export
        </button>
        <label className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer" title="Import blog posts from JSON">
          Import
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = evt => {
                try {
                  const imported = JSON.parse(evt.target.result);
                  if (Array.isArray(imported)) {
                    setPosts(posts => [...posts, ...imported.filter(p => p && p.title)]);
                  } else {
                    alert('Invalid blog post file.');
                  }
                } catch {
                  alert('Invalid JSON file.');
                }
              };
              reader.readAsText(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>
      {posts.length === 0 ? (
        <div className="text-gray-500">No posts yet. Click "+ New Post" to get started.</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post, idx) => (
            <li key={idx} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{post.title}</div>
                  <div className="text-xs text-gray-400">{new Date(post.date).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:underline" onClick={() => openEditor(idx)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => confirmDelete(idx)}>Delete</button>
                </div>
              </div>
              <div className="text-gray-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </li>
          ))}
        </ul>
      )}
      <BlogEditorModal
        open={editorOpen}
        onClose={closeEditor}
        onSave={savePost}
        initialData={editIndex !== null ? posts[editIndex] : null}
      />
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs">
            <div className="mb-4">Delete this post?</div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-1 rounded bg-gray-200" onClick={() => setDeleteIndex(null)}>Cancel</button>
              <button className="px-4 py-1 rounded bg-red-600 text-white font-bold" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
