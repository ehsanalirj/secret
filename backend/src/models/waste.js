import mongoose from 'mongoose';

const wasteSchema = new mongoose.Schema({
  inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantity: { type: Number, required: true, min: 0 },
  reason: { type: String, enum: ['expired', 'spoiled', 'overcooked', 'other'], required: true },
  date: { type: Date, default: Date.now },
  handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: { type: String, enum: ['donation', 'compost', 'trash', 'other'], default: 'trash' },
  notes: { type: String },
});

export default mongoose.model('Waste', wasteSchema);
