import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  type: { type: String, enum: ['mcq', 'coding', 'custom'], required: true },
  questions: [
    {
      question: String,
      options: [String],
      answer: String, // correct answer (for MCQ)
      maxScore: Number,
    }
  ],
  assignedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  answers: [
    {
      question: String,
      response: String,
      score: Number,
    }
  ],
  totalScore: Number,
  reviewed: { type: Boolean, default: false },
});

export default mongoose.model('Assessment', assessmentSchema);
