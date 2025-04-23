import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., admin, manager, staff, support, kitchen
  permissions: [{ type: String }], // e.g., ['menu:edit', 'order:view', ...]
  department: { type: String }, // e.g., HR, Ops, Finance
  deviceAccess: [{ type: String }], // e.g., ['mobile', 'pos', 'kds']
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Role', roleSchema);
