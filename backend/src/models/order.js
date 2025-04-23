import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    notes: String
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'], default: 'pending' },
  customer: {
    name: String,
    email: String,
    phone: String
  },
  complianceTags: [{ type: String }],
  dataClassification: { type: String, enum: ['public', 'internal', 'confidential', 'restricted'], default: 'internal' },
  dataResidency: { type: String, enum: ['EU', 'US', 'APAC', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.index({ tenant: 1, createdAt: -1 });

export default mongoose.model('Order', orderSchema);
