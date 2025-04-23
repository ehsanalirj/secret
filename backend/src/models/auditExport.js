import mongoose from 'mongoose';

const auditExportSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  format: { type: String, enum: ['csv', 'json'], required: true },
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String },
  status: { type: String, enum: ['pending', 'complete', 'failed'], default: 'pending' },
});

auditExportSchema.index({ tenant: 1, user: 1, createdAt: -1 });

export default mongoose.model('AuditExport', auditExportSchema);
