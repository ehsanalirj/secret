// Analytics model for tracking installs, ratings, and real-time events
import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  block: { type: mongoose.Schema.Types.ObjectId, ref: 'Block' },
  installs: { type: Number, default: 0 },
  ratings: [{ type: Number }],
  events: [{
    type: { type: String }, // e.g. 'install', 'review', 'flag', 'order', 'login', etc.
    meta: { type: mongoose.Schema.Types.Mixed }, // extensible metadata
    at: { type: Date, default: Date.now }
  }],
  metrics: {
    orders: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    custom: { type: mongoose.Schema.Types.Mixed } // extensible
  },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

AnalyticsSchema.index({ tenant: 1, createdAt: -1 });

export default mongoose.model('Analytics', AnalyticsSchema);
