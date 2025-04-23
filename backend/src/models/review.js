// Review model for block reviews, moderation, and flagging
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  block: { type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true },
  author: String,
  comment: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
  flagged: { type: Boolean, default: false },
  flagReason: String,
  removed: { type: Boolean, default: false }
});

export default mongoose.model('Review', ReviewSchema);
