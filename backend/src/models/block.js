// Block model for analytics, reviews, installs, ratings, etc.
import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  preview: String,
  installs: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  community: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Block', BlockSchema);
