import mongoose from 'mongoose';

const integrationSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  type: { type: String, required: true }, // e.g., 'payment', 'crm', 'delivery', 'analytics'
  name: { type: String, required: true },
  provider: { type: String },
  credentials: { type: mongoose.Schema.Types.Mixed }, // encrypted in production
  enabled: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'error', 'disabled'], default: 'active' },
  lastSync: { type: Date },
  error: { type: String },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

integrationSchema.index({ tenant: 1, type: 1, provider: 1 }, { unique: false });

export default mongoose.model('Integration', integrationSchema);
