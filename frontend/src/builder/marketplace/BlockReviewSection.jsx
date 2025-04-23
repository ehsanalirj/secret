import React, { useState } from 'react';
import { useToast } from '../components/ToastProvider';

export default function BlockReviewSection({ blockId, reviews: initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      toast.showToast({ type: 'error', message: 'Name and comment are required.' });
      return;
    }
    const newReview = {
      id: Date.now(),
      author,
      comment,
      rating,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    setAuthor('');
    setComment('');
    setRating(5);
    toast.showToast({ type: 'success', message: 'Review submitted!' });
  }

  return (
    <div className="mt-6">
      <h4 className="font-bold mb-2 text-blue-900">User Reviews</h4>
      <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input className="border rounded px-2 py-1 flex-1" placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} />
          <select className="border rounded px-2 py-1" value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
          </select>
        </div>
        <textarea className="border rounded px-2 py-1" placeholder="Your review..." value={comment} onChange={e => setComment(e.target.value)} rows={2} />
        <button className="self-end px-4 py-1 rounded bg-blue-700 text-white font-bold hover:bg-blue-900" type="submit">Submit Review</button>
      </form>
      <div className="flex flex-col gap-3">
        {reviews.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
        {reviews.map(r => (
          <div key={r.id} className="bg-gray-50 border rounded p-2">
            <div className="flex gap-2 items-center mb-1">
              <span className="font-bold text-blue-900">{r.author}</span>
              <span className="text-yellow-500">{'★'.repeat(r.rating)}</span>
              <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
            </div>
            <div className="text-gray-800 text-sm">{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
