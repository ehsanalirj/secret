import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', index: true }, // null for global
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }, // null for tenant-level
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
  description: { type: String },
  scope: { type: String, enum: ['global', 'tenant', 'user'], default: 'tenant' },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

settingSchema.index({ tenant: 1, user: 1, key: 1 }, { unique: true });

export default mongoose.model('Setting', settingSchema);
