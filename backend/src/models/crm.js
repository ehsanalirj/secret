import mongoose from 'mongoose';

const crmSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  customerName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  notes: { type: String },
  tags: [String],
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

crmSchema.index({ tenant: 1, email: 1 });

export default mongoose.model('CRM', crmSchema);
