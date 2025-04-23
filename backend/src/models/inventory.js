import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true },
  category: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true },
  supplier: { type: String },
  reorderThreshold: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

inventorySchema.index({ tenant: 1, name: 1 }, { unique: false });

export default mongoose.model('Inventory', inventorySchema);
