import mongoose from 'mongoose';

const webhookSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  url: { type: String, required: true },
  event: { type: String, required: true }, // e.g. 'order.created', 'payment.received'
  secret: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  lastSuccess: { type: Date },
  lastFailure: { type: Date },
  failureCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

webhookSchema.index({ tenant: 1, event: 1, url: 1 }, { unique: true });

export default mongoose.model('Webhook', webhookSchema);
