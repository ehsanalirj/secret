import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true }, // unique index handled below
  branding: {
    logoUrl: String,
    theme: Object,
    legalDocs: {
      privacyPolicy: String,
      termsOfUse: String,
    },
  },
  country: { type: String, required: true },
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  featureFlags: { type: Object, default: {} },
  departments: [{ type: String }],
  sandbox: { type: Boolean, default: false },
  // Compliance metadata
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  complianceStatus: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true, default: 'EU' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

tenantSchema.index({ domain: 1 }, { unique: true });

export default mongoose.model('Tenant', tenantSchema);
