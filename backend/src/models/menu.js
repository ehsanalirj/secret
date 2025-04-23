import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    available: { type: Boolean, default: true },
    tags: [String]
  }],
  isActive: { type: Boolean, default: true },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

menuSchema.index({ tenant: 1, name: 1 }, { unique: true });

export default mongoose.model('Menu', menuSchema);
