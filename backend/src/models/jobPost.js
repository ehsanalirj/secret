import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String },
  requirements: { type: String },
  location: { type: String },
  status: { type: String, enum: ['open', 'closed', 'paused'], default: 'open' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.model('JobPost', jobPostSchema);
