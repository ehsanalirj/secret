import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'invited', 'suspended', 'disabled'], default: 'active' },
  roles: [{ type: String, enum: ['admin', 'manager', 'staff', 'customer'] }],
  permissions: [{ type: String }],
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.index({ tenant: 1, email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
