import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['staff', 'manager'], required: true },
  department: { type: String },
  startDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive', 'terminated'], default: 'active' },
  salary: { type: Number },
  providentFund: {
    accountNumber: String,
    balance: Number,
    contributions: [{ amount: Number, date: Date }],
  },
  salarySlips: [{
    month: String,
    year: Number,
    url: String,
    generatedAt: Date,
  }],
  leaves: [{
    type: String, // annual, sick, casual, etc.
    from: Date,
    to: Date,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    appliedAt: Date,
    reason: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date,
  }],
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Employee', employeeSchema);
