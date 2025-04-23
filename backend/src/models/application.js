import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  resumeUrl: { type: String },
  answers: { type: Object },
  status: { type: String, enum: ['applied', 'shortlisted', 'interview', 'offered', 'hired', 'rejected'], default: 'applied' },
  history: [
    {
      status: String,
      at: { type: Date, default: Date.now },
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      note: String,
    }
  ],
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Application', applicationSchema);
