import mongoose from 'mongoose';
import crypto from 'crypto';

const apiKeySchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  key: { type: String, required: true, unique: true },
  label: { type: String },
  scopes: [{ type: String }], // e.g., ['orders:read', 'menu:write']
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastUsed: { type: Date },
  status: { type: String, enum: ['active', 'revoked'], default: 'active' },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

apiKeySchema.index({ tenant: 1, key: 1 }, { unique: true });

// Utility to generate secure random API keys
apiKeySchema.statics.generateKey = function() {
  return crypto.randomBytes(32).toString('hex');
};

export default mongoose.model('ApiKey', apiKeySchema);
