import mongoose from 'mongoose';

const brandingSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  logoUrl: { type: String },
  theme: { type: Object },
  legalDocs: {
    privacyPolicy: { type: String },
    termsOfUse: { type: String }
  },
  customDomain: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

brandingSchema.index({ tenant: 1 });

export default mongoose.model('Branding', brandingSchema);
