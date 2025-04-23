import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., HR, Ops, Finance, Kitchen
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  createdAt: { type: Date, default: Date.now },
});

departmentSchema.index({ name: 1, tenant: 1 }, { unique: true });

export default mongoose.model('Department', departmentSchema);
