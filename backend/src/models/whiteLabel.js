import mongoose from 'mongoose';

const whiteLabelSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  customDomain: { type: String },
  logoUrl: { type: String },
  theme: { type: Object },
  paymentGatewayConfig: { type: Object },
  thirdPartyIntegrations: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

whiteLabelSchema.index({ tenant: 1 });

export default mongoose.model('WhiteLabel', whiteLabelSchema);
