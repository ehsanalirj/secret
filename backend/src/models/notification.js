import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channel: { type: String, enum: ['email', 'sms', 'in-app'], required: true },
  template: { type: String },
  subject: { type: String },
  message: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  sentAt: { type: Date },
  error: { type: String },
  preferences: { type: mongoose.Schema.Types.Mixed },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

notificationSchema.index({ tenant: 1, user: 1, channel: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);
