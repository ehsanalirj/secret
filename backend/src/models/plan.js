import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., Free, Pro, Enterprise
  features: [{ type: String }],
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  limits: { type: Object }, // e.g., { users: 10, orders: 1000 }
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Plan', planSchema);
