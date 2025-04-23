import mongoose from 'mongoose';

const featureFlagSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'loyalty_program', 'promo_codes'
  description: { type: String },
  enabled: { type: Boolean, default: false },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }, // null = global
  country: { type: String }, // null = all
  plan: { type: String, enum: ['free', 'pro', 'enterprise'] }, // null = all
  department: { type: String }, // null = all
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

featureFlagSchema.index({ key: 1, tenant: 1, country: 1, plan: 1, department: 1 }, { unique: true });

export default mongoose.model('FeatureFlag', featureFlagSchema);
