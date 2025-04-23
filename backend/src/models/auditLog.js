import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }, // e.g., 'menu:update', 'order:cancel'
  details: { type: Object }, // Additional info (before/after, etc.)
  device: { type: String },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now },
});

auditLogSchema.index({ tenant: 1, user: 1, createdAt: -1 });

export default mongoose.model('AuditLog', auditLogSchema);
