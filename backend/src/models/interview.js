import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost', required: true },
  candidate: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  panel: [{ type: String }],
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  feedback: [
    {
      panelist: String,
      score: Number,
      notes: String,
      submittedAt: Date
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Interview', interviewSchema);
